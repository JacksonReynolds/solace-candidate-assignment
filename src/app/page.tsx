"use client";
import { useAdvocateSearch } from "@/hooks/useAdvocateSearch";
import { useEffect } from "react";

export default function Home() {
  const { searchTerm, advocates, setSearchTerm, fetchAdvocates } =
    useAdvocateSearch();

  useEffect(() => {
    console.log("fetching advocates...");
    fetchAdvocates(searchTerm);
  }, [searchTerm, fetchAdvocates]);

  const onSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const onReset = () => {
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
          Searching for: <span id='search-term'>{searchTerm}</span>
        </p>
        <input
          style={{ border: "1px solid black" }}
          value={searchTerm}
          onChange={onSearchInputChange}
        />
        <button onClick={onReset}>Reset Search</button>
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
              <tr key={advocate.firstName}>
                <td key={advocate.firstName}>{advocate.firstName}</td>
                <td key={advocate.lastName}>{advocate.lastName}</td>
                <td key={advocate.city}>{advocate.city}</td>
                <td key={advocate.degree}>{advocate.degree}</td>
                <td>
                  {advocate.specialties.map((s) => (
                    <div key={s}>{s}</div>
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
