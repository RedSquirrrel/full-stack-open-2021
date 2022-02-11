import axios from 'axios';
import storage from '../utlis/storage';

const baseUrl = '/api/blogs';

const getConfig = () => {
  return {
    headers: { Authorization: `bearer ${storage.loadUser().token}` },
  };
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = blog => {
  const request = axios.post(baseUrl, blog, getConfig());
  return request.then(response => response.data);
};

const update = (id, likes) => {
  const newObj = { id, likes: likes };
  const request = axios.put(`${baseUrl}/${id}`, newObj, getConfig());
  return request.then(response => response.data);
};

const removeBlog = id => {
  const request = axios.delete(`${baseUrl}/${id}`, getConfig());
  return request.then(response => response.data);
};

export default { getAll, create, update, removeBlog };
