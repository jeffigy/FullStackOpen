import axios from "axios";
import { ContactPerson } from "../App";
const baseUrl = "http://localhost:3001/persons";

const getAllPerson = () => {
  const req = axios.get(baseUrl);
  return req.then((res) => res.data);
};

const newPerson = (data: ContactPerson) => {
  const req = axios.post(baseUrl, data);
  return req.then((res) => res.data);
};

const updatePerson = (id: string, data: ContactPerson) => {
  const req = axios.put(`${baseUrl}/${id}`, data);
  return req.then((res) => res.data);
};

const deletePerson = (id: string) => {
  const req = axios.delete(`${baseUrl}/${id}`);
  return req.then((res) => res.data);
};

export default { getAllPerson, newPerson, updatePerson, deletePerson };
