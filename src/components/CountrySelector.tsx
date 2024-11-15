import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCountries } from "../services/healthcareApi";

interface CountrySelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({
  value,
  onChange,
}) => {
  const { data: countries, isLoading } = useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
  });

  if (isLoading) {
    return (
      <select className="block w-48 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm">
        <option>Loading...</option>
      </select>
    );
  }

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="block w-48 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    >
      {countries?.map((country) => (
        <option key={country.code} value={country.code}>
          {country.name}
        </option>
      ))}
    </select>
  );
};

export default CountrySelector;
