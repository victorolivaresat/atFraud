import axios from "./axios";

export const createAnalyst = async (analyst) => {
  const { data } = await axios.post('analyst', analyst);
  return data;
};

export const updateAnalyst = async (id, analyst) => {
  const { data } = await axios.put(`analyst/${id}`, analyst);
  return data;
};

export const restoreAnalyst = async (id) => {
  const { data } = await axios.post(`analyst/${id}/restore`);
  return data;
};

export const deleteAnalyst = async (id) => {
  const { data } = await axios.delete(`analyst/${id}`);
  return data;
};

export const getAnalyst = async (id) => {
  const { data } = await axios.get(`analyst/${id}`);
  return data;
};

export const getAllAnalysts = async () => {
  const { data } = await axios.get('analysts');
  return data;
};
