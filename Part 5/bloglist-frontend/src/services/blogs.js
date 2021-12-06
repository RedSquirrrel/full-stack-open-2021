import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const request = axios.get(baseUrl);
  const response = await request;
  return response.data;
};

const create = async newObj => {
  const config = { headers: { Authorization: token } };

  const response = await axios.post(baseUrl, newObj, config);
  return response.data;
};

const update = async (id, newObject) => {
  const config = { headers: { Authorization: token } };
  const request = axios.put(`${baseUrl}/${id}`, newObject, config);
  const response = await request;
  return response.data;
};

const removeBlog = async id => {
  const config = { headers: { Authorization: token } };
  const request = axios.delete(`${baseUrl}/${id}`, config);
  const response = await request;
  return response.data;
};

const services = { getAll, setToken, create, update, removeBlog };
export default services;
