import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = newToken => {
  token = `bearer ${ newToken }`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  };

  const res = await axios.post(baseUrl, newObject, config);
  return res.data;
};

const replace = async oldObject => {
  const config = {
    headers: { Authorization: token },
  };

  const target = `${ baseUrl }/${ oldObject.id }`;
  const res = await axios.put(target, oldObject, config);
  return res.data;
};

const remove = async id => {
  const config = {
    headers: { Authorization: token },
  };

  const target = `${ baseUrl }/${ id }`;
  const res = await axios.delete(target, config);
  return res.data;
};



export default { getAll, setToken, create, replace, remove };
