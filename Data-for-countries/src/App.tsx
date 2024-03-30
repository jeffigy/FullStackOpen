import { useEffect, useMemo, useState } from "react";
import { CountryType } from "./services/country";
import countryServices from "./services/countries";
const App = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [countries, setcountries] = useState<CountryType[] | null>(null);
  const [isError, setIsError] = useState<string | null>(null);

  useEffect(() => {
    countryServices
      .getAllCountries()
      .then((data) => {
        setcountries(data);
      })
      .catch((_error) => {
        setIsError("failed to fetch countries");
        setTimeout(() => {
          setIsError(null);
        }, 5000);
      });
  }, []);

  const filteredCountries = useMemo(() => {
    if (!countries) return null;
    if (searchInput === "") return countries;
    return countries.filter((country: CountryType) =>
      country.name.common
        .toLowerCase()
        .includes(searchInput.toLocaleLowerCase())
    );
  }, [countries, searchInput]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <p>find countries</p>
        <input
          type="text"
          style={{
            height: "20px",
            marginLeft: "5px",
          }}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <div>
        {isError ? (
          <p>{isError}</p>
        ) : (
          <div>
            {filteredCountries &&
            filteredCountries.length > 10 &&
            searchInput !== "" ? (
              <p>Too many matches, specify another filter</p>
            ) : filteredCountries &&
              filteredCountries.length === 1 &&
              searchInput !== "" ? (
              <div>
                {filteredCountries.map((country: CountryType) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        alignItems: "flex-start",
                      }}
                      key={country.name.common}
                    >
                      {" "}
                      <h1>{country.name.common}</h1>
                      <div
                        style={{
                          lineHeight: "0.3",
                        }}
                      >
                        {" "}
                        <p>Capital: {country.capital}</p>
                        <p>Area: {country.area}</p>
                      </div>
                      <div>
                        <h2>Languages:</h2>

                        <ul>
                          {Object.entries(country.languages).map(
                            ([code, language]) => (
                              <li key={code}>{language}</li>
                            )
                          )}
                        </ul>
                      </div>
                      <img
                        src={country.flags.svg}
                        style={{
                          height: "100px",
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <CountryList countries={filteredCountries || []} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

const CountryList = ({ countries }: { countries: CountryType[] }) => {
  return (
    <>
      {countries.map((country: CountryType) => {
        return <p key={country.name.common}>{country.name.common}</p>;
      })}
    </>
  );
};
