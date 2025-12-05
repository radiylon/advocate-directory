"use client";

import { ChangeEvent, Suspense } from "react";
import { useQueryState, parseAsInteger, parseAsString } from "nuqs";
import { useAdvocates } from "@/hooks/useAdvocates";
import { Pagination } from "@/app/components/Pagination";

function AdvocateDirectory() {
  const [searchTerm, setSearchTerm] = useQueryState("search", parseAsString.withDefault(""));
  const [currentPage, setCurrentPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const { advocates, pagination } = useAdvocates(searchTerm, currentPage);

  const onSearchTermChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const resetSearch = () => {
    setSearchTerm("");
    setCurrentPage(1);
  };

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span>{searchTerm}</span>
        </p>
        <input style={{ border: "1px solid black" }} value={searchTerm} onChange={onSearchTermChange} />
        <button onClick={resetSearch}>Reset Search</button>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={pagination.totalPages}
        totalCount={pagination.totalCount}
        onPageChange={setCurrentPage}
      />
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Degree</th>
            <th>Specialties</th>
            <th>Years of Experience</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {advocates.map((advocate) => {
            return (
              <tr key={advocate.id}>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {advocate.specialties.map((specialty, index) => (
                    <div key={index}>{specialty}</div>
                  ))}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div style={{ margin: "24px" }}>Loading...</div>}>
      <AdvocateDirectory />
    </Suspense>
  );
}
