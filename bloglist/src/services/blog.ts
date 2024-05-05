import axios from "axios";
import { BlogType } from "../types";
import { BlogsURL } from "../baseUrl";
let token: null | string = null;

const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`;
};
const getAll = () => {
  const req = axios.get(BlogsURL);
  return req.then((res: any) => res.data);
};

const create = (newObject: BlogType) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  console.log(config);
  const req = axios.post(BlogsURL, newObject, config);
  return req.then((res) => res.data);
};

const update = (id: string, blogObject: BlogType) => {
  const req = axios.put(`${BlogsURL}/${id}`, blogObject);
  return req.then((res) => res.data);
};

const deleteBlog = (id: string) => {
  const req = axios.delete(`${BlogsURL}/${id}`);
  return req.then((res) => res.data);
};

export default { getAll, setToken, create, update, deleteBlog };
