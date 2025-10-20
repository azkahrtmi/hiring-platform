import type { ApplicantField } from "../utils/jobFormConfig";

interface Props {
  fields: ApplicantField[];
  onChange: (updatedFields: ApplicantField[]) => void;
}

export default function FieldConfigSelector({ fields, onChange }: Props) {
  const handleStateChange = (key: string, newState: string) => {
    const updated = fields.map((f) =>
      f.key === key ? { ...f, state: newState as any } : f
    );
    onChange(updated);
  };

  return (
    <div className="border rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-3">
        Minimum Profile Information Required
      </h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th className="pb-2">Field</th>
            <th className="pb-2">Setting</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field) => (
            <tr key={field.key} className="border-b last:border-none">
              <td className="py-2">{field.label}</td>
              <td>
                <select
                  className="border rounded-md px-2 py-1 text-sm"
                  value={field.state}
                  onChange={(e) =>
                    handleStateChange(field.key, e.target.value)
                  }
                >
                  <option value="mandatory">Mandatory</option>
                  <option value="optional">Optional</option>
                  <option value="off">Off</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
