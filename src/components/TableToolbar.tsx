interface Props {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export default function TableToolbar({ searchTerm, onSearchChange }: Props) {
  return (
    <div className="flex justify-between items-center mb-4">
      <input
        type="text"
        placeholder="Search candidate..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="border rounded-md px-3 py-2 w-64"
      />
    </div>
  );
}
