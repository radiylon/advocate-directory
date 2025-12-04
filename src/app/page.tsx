"use client";

import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Advocate } from "@/db/schema";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchAdvocates = useCallback(async (search: string) => {
    const params = search ? `?search=${encodeURIComponent(search)}` : "";
    const response = await fetch(`/api/advocates${params}`);
    const json = await response.json();
    setAdvocates(json.data);
  }, []);

  useEffect(() => {
    fetchAdvocates(searchTerm);
  }, [fetchAdvocates, searchTerm]);

  const onSearchTermChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const resetSearch = () => {
    setSearchTerm("");
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
        <input style={{ border: "1px solid black" }} onChange={onSearchTermChange} />
        <button onClick={resetSearch}>Reset Search</button>
      </div>
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
