import axios from "axios";
const baseURL = "https://studies.cs.helsinki.fi/restcountries/api/all";
import { CountryType } from "./country";

const getAllCountries = async () => {
  const req = axios.get(baseURL);
  return await req.then((res) => res.data);
};

export default { getAllCountries };
