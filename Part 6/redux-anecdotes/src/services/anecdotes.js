import axios from 'axios';
const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export const createNew = async content => {
  const newObj = { content, votes: 0 };
  const response = await axios.post(baseUrl, newObj);
  return response.data;
};

export const update = async (id, votes) => {
  const newObj = { id, votes: votes };
  const response = await axios.patch(`${baseUrl}/${id}`, newObj);
  return response.data;
};

export default { getAll, createNew, update };
