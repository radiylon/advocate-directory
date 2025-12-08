import { Advocate } from "@/db/schema";
import { SpecialtyTag } from "./SpecialtyTag";

const MAX_VISIBLE_SPECIALTIES = 3;

interface AdvocateCardProps {
  advocate: Advocate;
}

export function AdvocateCard({ advocate }: AdvocateCardProps) {
  const visibleSpecialties = advocate.specialties.slice(0, MAX_VISIBLE_SPECIALTIES);
  const remainingCount = advocate.specialties.length - MAX_VISIBLE_SPECIALTIES;

  return (
    <div className="rounded-lg border border-primary/20 bg-white p-4 hover:border-primary hover:shadow-md cursor-pointer">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold text-black">
            {advocate.firstName} {advocate.lastName}
            <span className="font-normal">, {advocate.degree}</span>
          </h3>
          <div className="font-normal text-primary italic text-lg">{advocate.yearsOfExperience}+ years of experience</div>
        </div>
        <div className="shrink-0 flex flex-col items-end text-base text-gray-700">
          <span className="text-black font-bold text-lg">{advocate.city}, {advocate.state}</span>
          <span className="text-gray-700">{advocate.phoneNumber}</span>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {visibleSpecialties.map((specialty) => (
          <SpecialtyTag key={specialty} specialty={specialty} />
        ))}
        {remainingCount > 0 && (
          <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
            +{remainingCount} more
          </span>
        )}
      </div>
    </div>
  );
}
