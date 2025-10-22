import { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { FiCalendar } from "react-icons/fi";
import "react-day-picker/dist/style.css";

interface DatePickerProps {
  value?: string;
  onChange: (value: string) => void;
  error?: boolean;
}

export default function DatePicker({
  value,
  onChange,
  error,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Date | undefined>(
    value ? new Date(value) : undefined
  );
  const ref = useRef<HTMLDivElement>(null);

  const handleSelect = (date?: Date) => {
    if (date) {
      setSelected(date);
      onChange(format(date, "yyyy-MM-dd"));
      setOpen(false);
    }
  };

  // Tutup popover kalau klik di luar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`border rounded-md px-3 py-2 w-full text-left text-sm flex items-center justify-between ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        <span>
          {selected ? format(selected, "MMMM d, yyyy") : "Select date"}
        </span>
        <FiCalendar className="text-gray-500" />
      </button>

      {open && (
        <div className="absolute z-20 mt-2 bg-white border border-gray-200 rounded-lg shadow-md p-2">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={handleSelect}
            captionLayout="dropdown"
            fromYear={1950}
            toYear={2025}
          />
        </div>
      )}
    </div>
  );
}
