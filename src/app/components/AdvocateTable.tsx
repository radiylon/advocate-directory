import { Advocate } from "@/db/schema";

interface AdvocatesTableProps {
  advocates: Advocate[];
}

export function AdvocatesTable({ advocates }: AdvocatesTableProps) {
  return (
    <table className="w-full border-collapse border border-gray-300 mt-6">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-300 px-4 py-2 text-left">First Name</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Last Name</th>
          <th className="border border-gray-300 px-4 py-2 text-left">City</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Degree</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Specialties</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Years of Experience</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Phone Number</th>
        </tr>
      </thead>
      <tbody>
        {advocates.map((advocate) => {
          return (
            <tr key={advocate.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{advocate.firstName}</td>
              <td className="border border-gray-300 px-4 py-2">{advocate.lastName}</td>
              <td className="border border-gray-300 px-4 py-2">{advocate.city}</td>
              <td className="border border-gray-300 px-4 py-2">{advocate.degree}</td>
              <td className="border border-gray-300 px-4 py-2">
                {advocate.specialties.map((specialty, index) => (
                  <div key={index}>{specialty}</div>
                ))}
              </td>
              <td className="border border-gray-300 px-4 py-2">{advocate.yearsOfExperience}</td>
              <td className="border border-gray-300 px-4 py-2">{advocate.phoneNumber}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
