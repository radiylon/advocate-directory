import { Advocate } from "@/db/schema";
import { AdvocateCard } from "./AdvocateCard";

interface AdvocateListProps {
  advocates: Advocate[];
}

export function AdvocateList({ advocates }: AdvocateListProps) {
  return (
    <div className="mt-6 flex flex-col gap-4">
      {advocates.map((advocate) => (
        <AdvocateCard key={advocate.id} advocate={advocate} />
      ))}
    </div>
  );
}
