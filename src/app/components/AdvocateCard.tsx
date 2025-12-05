import { Advocate } from "@/db/schema";

interface AdvocateCardProps {
  advocate: Advocate;
}

function formatPhoneNumber(phone: number): string {
  const phoneStr = phone.toString();
  if (phoneStr.length === 10) {
    return `(${phoneStr.slice(0, 3)}) ${phoneStr.slice(3, 6)}-${phoneStr.slice(6)}`;
  }
  return phoneStr;
}

export function AdvocateCard({ advocate }: AdvocateCardProps) {
  return (
    <div className="rounded-lg border border-primary/20 bg-white p-4 transition-shadow hover:border-primary/40 hover:shadow-md cursor-pointer">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold text-black">
            {advocate.firstName} {advocate.lastName}
            <span className="font-normal">, {advocate.degree}</span>
          </h3>
          <div className="font-normal text-primary italic text-lg">{advocate.yearsOfExperience}+ years of experience</div>
        </div>
        <div className="shrink-0 flex flex-col items-end text-base text-gray-700">
          <span className="text-black font-bold text-lg">{advocate.city}</span>
          <span className="text-gray-700">{formatPhoneNumber(Number(advocate.phoneNumber))}</span>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {advocate.specialties.slice(0, 3).map((specialty, index) => (
          <span
            key={index}
            className="rounded-full bg-secondary/20 px-3 py-1 text-sm text-primary"
          >
            {specialty}
          </span>
        ))}
        {advocate.specialties.length > 3 && (
          <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
            +{advocate.specialties.length - 3} more
          </span>
        )}
      </div>
    </div>
  );
}
