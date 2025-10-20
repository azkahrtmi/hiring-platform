import { cn } from "../../utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
}

export default function Button({ variant = "primary", className, ...props }: ButtonProps) {
  const base = "px-4 py-2 rounded-lg font-medium transition";
  const styles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
  };

  return <button {...props} className={cn(base, styles[variant], className)} />;
}
