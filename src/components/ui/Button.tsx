import type { ReactNode } from "react";

export default function Button({ children, variant = "primary", className = "", onClick, ariaLabel, type }: {
  children: ReactNode; variant?: "primary" | "secondary" | "ghost" | "icon";
  className?: string; onClick?: () => void; ariaLabel?: string; type?: "button" | "submit";
}) {
  return <button type={type ?? "button"} className={`btn btn-${variant} ${className}`} onClick={onClick} aria-label={ariaLabel}>{children}</button>;
}
