import axios from "axios";
import { NoteType } from "../main";
const baseUrl = "/api/notes";
let token: null | string = null;

const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const req = axios.get(baseUrl);
  return req.then((res) => res.data);
};

const create = (newObject: NoteType) => {
  const config = {
    headers: { Authorization: token },
  };
  const req = axios.post(baseUrl, newObject, config);
  return req.then((res) => res.data);
};

const update = (id: string, newObject: NoteType) => {
  const req = axios.put(`${baseUrl}/${id}`, newObject);
  return req.then((res) => res.data);
};

export default { getAll, create, update, setToken };
