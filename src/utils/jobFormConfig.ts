export interface ApplicantField {
  key: string;
  label: string;
  state: "mandatory" | "optional" | "off";
}

export const defaultApplicantFields = [
  { key: "photo", label: "Photo Profile", state: "mandatory" },
  { key: "full_name", label: "Full name", state: "mandatory" },
  { key: "birth_date", label: "Date of birth", state: "mandatory" },
  { key: "gender", label: "Pronoun (gender)", state: "mandatory" },
  { key: "domicile", label: "Domicile", state: "mandatory" },
  { key: "phone", label: "Phone number", state: "mandatory" },
  { key: "email", label: "Email", state: "mandatory" },
  { key: "linkedin", label: "Link LinkedIn", state: "optional" },
];
