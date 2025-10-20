import { useState, useRef } from "react";

interface Candidate {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  gender: string;
  linkedin: string;
  domicile: string;
  applied_date: string;
}

interface Props {
  data: Candidate[];
}

export default function CandidateTable({ data }: Props) {
  const [columns, setColumns] = useState([
    { key: "full_name", label: "Name", width: 180 },
    { key: "email", label: "Email", width: 200 },
    { key: "phone", label: "Phone", width: 150 },
    { key: "gender", label: "Gender", width: 100 },
    { key: "linkedin", label: "LinkedIn", width: 200 },
    { key: "domicile", label: "Domicile", width: 150 },
    { key: "applied_date", label: "Applied Date", width: 130 },
  ]);

  const [dragCol, setDragCol] = useState<number | null>(null);
  const [dragOverCol, setDragOverCol] = useState<number | null>(null);
  const resizingRef = useRef<number | null>(null);

  // Drag reorder
  const handleDragStart = (index: number) => setDragCol(index);
  const handleDragOver = (index: number) => setDragOverCol(index);
  const handleDrop = () => {
    if (dragCol === null || dragOverCol === null) return;
    const newCols = [...columns];
    const [moved] = newCols.splice(dragCol, 1);
    newCols.splice(dragOverCol, 0, moved);
    setColumns(newCols);
    setDragCol(null);
    setDragOverCol(null);
  };

  // Resize logic
  const handleMouseDown = (index: number) => (resizingRef.current = index);
  const handleMouseMove = (e: MouseEvent) => {
    if (resizingRef.current === null) return;
    const index = resizingRef.current;
    const newCols = [...columns];
    newCols[index].width = Math.max(80, newCols[index].width + e.movementX);
    setColumns(newCols);
  };
  const handleMouseUp = () => (resizingRef.current = null);

  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("mouseup", handleMouseUp);

  return (
    <div className="mt-4 border border-gray-200 rounded-lg overflow-x-auto">
      <table className="w-full border-collapse text-sm text-slate-700">
        <thead className="bg-gray-50 text-gray-600 font-semibold">
          <tr>
            {columns.map((col, index) => (
              <th
                key={col.key}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={() => handleDragOver(index)}
                onDrop={handleDrop}
                style={{ width: col.width }}
                className={`relative text-left px-4 py-3 border-b border-gray-200 select-none ${
                  dragOverCol === index ? "bg-blue-50" : ""
                }`}
              >
                {col.label}
                <div
                  onMouseDown={() => handleMouseDown(index)}
                  className="absolute top-0 right-0 h-full w-1 cursor-col-resize hover:bg-blue-400"
                />
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-12 text-gray-500 bg-white"
              >
                No applicants found
              </td>
            </tr>
          ) : (
            data.map((cand) => (
              <tr key={cand.id} className="border-b hover:bg-gray-50">
                {columns.map((col) => (
                  <td
                    key={col.key}
                    style={{ width: col.width }}
                    className="px-4 py-2 truncate"
                  >
                    {col.key === "linkedin" ? (
                      <a
                        href={cand[col.key as keyof Candidate] as string}
                        className="text-blue-600 hover:underline"
                      >
                        {cand[col.key as keyof Candidate] as string}
                      </a>
                    ) : (
                      cand[col.key as keyof Candidate]
                    )}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
