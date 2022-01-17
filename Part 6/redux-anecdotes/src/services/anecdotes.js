import axios from 'axios';
const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  console.log(response.data);
  return response.data;
};

export const createNew = async content => {
  const newObj = { content, votes: 0 };
  const response = await axios.post(baseUrl, newObj);
  return response.data;
};

export default { getAll, createNew };
