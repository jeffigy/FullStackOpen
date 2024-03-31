import { CountryType } from "../services/country";

const CountryDetails = ({ country }: { country: CountryType }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      alignItems: "flex-start",
    }}
  >
    <h1>{country.name.common}</h1>
    <div style={{ lineHeight: "0.3" }}>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
    </div>
    <div>
      <h2>Languages:</h2>
      <ul>
        {country.languages &&
          Object.keys(country.languages).map((key) => (
            <li key={key}>{country.languages[key]}</li>
          ))}
      </ul>
    </div>
    <img src={country.flags.svg} style={{ height: "100px" }} />
  </div>
);

export default CountryDetails;
