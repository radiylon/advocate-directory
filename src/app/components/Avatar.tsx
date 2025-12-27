interface AvatarProps {
  firstName: string;
  lastName: string;
}

function getInitials(firstName: string, lastName: string): string {
  const first = firstName.trim().charAt(0).toUpperCase() || "?";
  const last = lastName.trim().charAt(0).toUpperCase() || "?";
  return `${first}${last}`;
}

export function Avatar({ firstName, lastName }: AvatarProps) {
  const initials = getInitials(firstName, lastName);

  return (
    <div
      className="w-16 h-16 text-2xl bg-primary text-white flex items-center justify-center font-display font-semibold shrink-0"
      aria-label={`Avatar for ${firstName} ${lastName}`}
    >
      {initials}
    </div>
  );
}
