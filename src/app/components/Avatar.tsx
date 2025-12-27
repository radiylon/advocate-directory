interface AvatarProps {
  firstName: string;
  lastName: string;
  size?: "sm" | "md" | "lg";
}

const SIZE_CLASSES = {
  sm: "w-10 h-10 text-base",
  md: "w-12 h-12 text-lg",
  lg: "w-16 h-16 text-2xl",
};

function getInitials(firstName: string, lastName: string): string {
  const first = firstName.trim().charAt(0).toUpperCase() || "?";
  const last = lastName.trim().charAt(0).toUpperCase() || "?";
  return `${first}${last}`;
}

export function Avatar({ firstName, lastName, size = "md" }: AvatarProps) {
  const initials = getInitials(firstName, lastName);
  const sizeClass = SIZE_CLASSES[size];

  return (
    <div
      className={`${sizeClass} bg-primary text-white flex items-center justify-center font-display font-semibold shrink-0`}
      aria-label={`Avatar for ${firstName} ${lastName}`}
    >
      {initials}
    </div>
  );
}
