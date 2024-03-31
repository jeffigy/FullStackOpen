import { useState } from "react";
import { CountryType } from "../services/country";
import CountryDetails from "./CountryDetails";

const CountryList = ({ countries }: { countries: CountryType[] }) => {
  const [showDetails, setShowDetails] = useState<boolean[]>(
    new Array(countries.length).fill(false)
  );

  const toggleDetails = (index: number) => {
    const newShowDetails = [...showDetails];
    newShowDetails[index] = !newShowDetails[index];
    setShowDetails(newShowDetails);
  };

  return (
    <>
      {countries.map((country: CountryType, index: number) => (
        <div key={country.name.common} style={{ marginBottom: "5px" }}>
          <div
            style={{
              display: "flex",
              height: "20px",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <p>{country.name.common}</p>
            <button onClick={() => toggleDetails(index)}>
              {showDetails[index] ? "Hide" : "Show"}
            </button>
          </div>
          {showDetails[index] && <CountryDetails country={country} />}
        </div>
      ))}
    </>
  );
};

export default CountryList;
