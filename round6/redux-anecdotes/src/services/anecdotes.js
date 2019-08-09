import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const postAnecdote = async (content) => {
  const newAnec = { content, votes: 0 };
  const response = await axios.post(baseUrl, newAnec);
  return response.data;
};

const patchAnec = async (id, votes) => axios.patch(`${ baseUrl }/${ id }`, { votes });

export default {
  getAll,
  postAnecdote,
  patchAnec
};
