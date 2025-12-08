import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function Button({
  children,
  disabled,
  className = "",
  ...props
}: ButtonProps): JSX.Element {
  const baseClasses =
    "px-4 py-2 border border-black rounded text-sm sm:text-base";
  const stateClasses = disabled
    ? "cursor-not-allowed opacity-50 bg-gray-200"
    : "cursor-pointer hover:bg-gray-100";

  return (
    <button
      disabled={disabled}
      className={`${baseClasses} ${stateClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
