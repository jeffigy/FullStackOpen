import axios from "axios";
import { LoginURL } from "../baseUrl";

const login = async (credentials: any) => {
  const res = await axios.post(LoginURL, credentials);
  return res.data;
};

export default { login };
