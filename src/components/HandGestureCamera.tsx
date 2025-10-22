import { useEffect, useRef, useState } from "react";
import { Hands, HAND_CONNECTIONS, type Results } from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";

interface Props {
  onSave: (dataUrl: string) => void; // callback when user saves
  showButton?: boolean; // optionally show manual capture button
}

/**
 * HandGestureCamera
 * - otomatis capture saat 3 jari terdeteksi
 * - tampilkan preview
 * - user bisa Save atau Retake
 */
export default function HandGestureCamera({
  onSave,
  showButton = true,
}: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const captureCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const cameraRef = useRef<Camera | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("Ready");
  const lastAutoCaptureRef = useRef<number>(0);

  // simple debounce so not capture continuously
  const AUTO_CAPTURE_COOLDOWN_MS = 2000;

  useEffect(() => {
    let hands: Hands;

    async function init() {
      if (!videoRef.current || !canvasRef.current) return;

      hands = new Hands({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
      });

      hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.6,
        minTrackingConfidence: 0.6,
      });

      hands.onResults(onResults);

      cameraRef.current = new Camera(videoRef.current, {
        onFrame: async () => {
          await hands.send({ image: videoRef.current! });
        },
        width: 640,
        height: 480,
      });

      cameraRef.current.start();
    }

    init();

    return () => {
      cameraRef.current?.stop();
      hands?.close?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function drawResults(results: Results) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    canvas.width = results.image.width || 640;
    canvas.height = results.image.height || 480;

    // draw mirrored video frame
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

    // draw landmarks & connections if exist
    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
      for (const landmarks of results.multiHandLandmarks) {
        // connections
        ctx.lineWidth = 2;
        ctx.strokeStyle = "rgba(0,0,0,0.6)";
        for (const conn of HAND_CONNECTIONS) {
          const [a, b] = conn;
          const pa = landmarks[a];
          const pb = landmarks[b];
          ctx.beginPath();
          ctx.moveTo(pa.x * canvas.width, pa.y * canvas.height);
          ctx.lineTo(pb.x * canvas.width, pb.y * canvas.height);
          ctx.stroke();
        }

        // landmarks
        for (const lm of landmarks) {
          ctx.beginPath();
          ctx.arc(lm.x * canvas.width, lm.y * canvas.height, 4, 0, 2 * Math.PI);
          ctx.fillStyle = "rgba(255,255,255,0.9)";
          ctx.fill();
          ctx.strokeStyle = "rgba(0,0,0,0.5)";
          ctx.stroke();
        }
      }
    }
    ctx.restore();
  }

  function onResults(results: Results) {
    drawResults(results);

    // count fingers if hand landmarks present
    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
      const landmarks = results.multiHandLandmarks[0];
      const count = countFingers(landmarks);
      setStatus(`Detected fingers: ${count}`);

      const now = Date.now();
      if (
        count === 3 &&
        now - lastAutoCaptureRef.current > AUTO_CAPTURE_COOLDOWN_MS
      ) {
        lastAutoCaptureRef.current = now;
        // auto capture
        doCapture();
      }
    } else {
      setStatus("No hand detected");
    }
  }

  /**
   * Count extended fingers naive algorithm:
   * - Use landmarks indices from MediaPipe:
   *   tips: 4 (thumb), 8 (index), 12 (middle), 16 (ring), 20 (pinky)
   *   pip: 3 (thumb IP), 6 (index PIP), 10 (middle PIP), 14 (ring PIP), 18 (pinky PIP)
   * - For four fingers (index..pinky) compare tip.y < pip.y (for upright palm facing camera)
   * - For thumb, compare tip.x vs ip.x depending on handness — for simplicity check horizontal distance
   *
   * NOTE: This is a heuristic that works for many front-facing cases. For robust detection,
   * use a dedicated finger-pose classifier.
   */
  function countFingers(
    landmarks: Array<{ x: number; y: number; z?: number }>
  ) {
    if (!landmarks || landmarks.length < 21) return 0;

    // helper to check if finger extended (index, middle, ring, pinky)
    const tipIndices = [8, 12, 16, 20];
    const pipIndices = [6, 10, 14, 18];
    let count = 0;

    for (let i = 0; i < tipIndices.length; i++) {
      const tip = landmarks[tipIndices[i]];
      const pip = landmarks[pipIndices[i]];
      // if tip is "above" pip in image coordinates (smaller y) => finger up
      if (tip.y < pip.y - 0.02) count++;
    }

    // thumb: compare tip.x with ip.x (landmark 4 vs 3). If tip is to the right of ip -> extended (for right hand),
    // but handedness not provided here. Use distance between tip and wrist direction as proxy:
    const thumbTip = landmarks[4];
    const thumbIp = landmarks[3];
    const wrist = landmarks[0];
    // vector wrist->thumbTip vs wrist->indexMcp (5) to guess orientation
    const indexMCP = landmarks[5];
    const thumbExtended =
      Math.abs(thumbTip.x - thumbIp.x) > 0.03 &&
      Math.abs(thumbTip.x - wrist.x) > Math.abs(indexMCP.x - wrist.x) / 2;
    if (thumbExtended) count++;

    return count;
  }

  function doCapture() {
    const canvas = captureCanvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext("2d")!;
    // draw current video frame
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
    setPreview(dataUrl);
    setStatus("Captured (preview)");
  }

  function handleSave() {
    if (!preview) return;
    onSave(preview);
    setStatus("Saved to form");
    // optionally clear preview or keep it
  }

  function handleRetake() {
    setPreview(null);
    setStatus("Ready");
    // allow camera to continue
  }

  return (
    <div className="w-full max-w-md">
      <div className="relative bg-black rounded-md overflow-hidden">
        {/* hidden native video used by Camera util */}
        <video
          ref={videoRef}
          className="hidden"
          playsInline
          style={{ transform: "scaleX(-1)" }} // mirror for natural selfie behavior
        />
        {/* visible canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-auto"
          style={{ background: "#111" }}
        />
      </div>

      <div className="mt-2 flex items-center justify-between gap-2">
        <div className="text-xs text-gray-600">{status}</div>

        <div className="flex gap-2">
          {showButton && (
            <button
              type="button"
              onClick={() => doCapture()}
              className="px-3 py-1 rounded-md border text-sm bg-white"
            >
              Capture
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              // toggle preview off if any
              if (preview) handleRetake();
            }}
            className="px-3 py-1 rounded-md border text-sm bg-white"
          >
            {preview ? "Retake" : "—"}
          </button>
        </div>
      </div>

      {/* hidden canvas to create dataURL */}
      <canvas ref={captureCanvasRef} style={{ display: "none" }} />

      {/* Preview & Save */}
      {preview && (
        <div className="mt-3 p-2 border rounded-md bg-gray-50">
          <div className="mb-2 text-sm">Preview</div>
          <img src={preview} alt="preview" className="w-full rounded-md" />
          <div className="mt-2 flex gap-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-md bg-teal-600 text-white"
            >
              Save
            </button>
            <button
              onClick={handleRetake}
              className="px-4 py-2 rounded-md border"
            >
              Retake
            </button>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            Auto-capture triggers when 3 fingers are detected. You can retake if
            unsatisfied.
          </div>
        </div>
      )}
    </div>
  );
}
