export interface ApplicantField {
  key: string;
  label: string;
  state: "mandatory" | "optional" | "off";
}

export const defaultApplicantFields: ApplicantField[] = [
  { key: "full_name", label: "Full Name", state: "mandatory" },
  { key: "email", label: "Email", state: "mandatory" },
  { key: "linkedin_link", label: "LinkedIn", state: "optional" },
  { key: "domicile", label: "Domicile", state: "optional" },
  { key: "gender", label: "Gender", state: "off" },
  { key: "phone_number", label: "Phone Number", state: "mandatory" },
  { key: "date_of_birth", label: "Date of Birth", state: "off" },
];
