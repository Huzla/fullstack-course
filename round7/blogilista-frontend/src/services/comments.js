import axios from "axios";
//Change this to something else.
const baseUrl = "http://localhost:3002/comments";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = async newObject => {
  const res = await axios.post(baseUrl, newObject);
  return res.data;
};

export default { getAll, create };
