import axios from "axios";
import { NoteType } from "../main";
const baseUrl = "http://localhost:3001/notes";

const getAll = () => {
  const req = axios.get(baseUrl);
  return req.then((res) => res.data);
};

const create = (newObject: NoteType) => {
  const req = axios.post(baseUrl, newObject);
  return req.then((res) => res.data);
};

const update = (id: string, newObject: NoteType) => {
  const req = axios.put(`${baseUrl}/${id}`, newObject);
  return req.then((res) => res.data);
};

export default { getAll, create, update };
