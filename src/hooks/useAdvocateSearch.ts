import { useCallback, useState } from "react";

type Advocate = {
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: string;
};

export const useAdvocateSearch = () => {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const fetchAdvocates = useCallback((searchArg: string) => {
    return fetch(`/api/advocates?search=${searchArg}`).then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
      });
    });
  }, []);

  return {
    searchTerm,
    advocates,
    setSearchTerm,
    fetchAdvocates,
  };
};
