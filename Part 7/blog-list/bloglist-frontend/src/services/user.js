import axios from 'axios';
const baseUrl = '/api/users';
import storage from '../utlis/storage';

const getConfig = () => {
  return {
    headers: { Authorization: `bearer ${storage.loadUser().token}` },
  };
};

const getAll = () => {
  const request = axios.get(baseUrl, getConfig());
  return request.then(response => response.data);
};

export default { getAll };
