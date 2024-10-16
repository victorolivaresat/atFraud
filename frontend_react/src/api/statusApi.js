import axios from "./axios";

export const getStatusById = async (statusId) => {
  const { data } = await axios.get(`status/${statusId}`);
  return data;
};

export const getAllStatuses = async () => {
  const { data } = await axios.get(`statuses`);
  return data;
};

export const createStatus = async (status) => {
  const { data } = await axios.post(`status`, status);
  return data;
};

export const updateStatus = async (statusId, status) => {
  const { data } = await axios.put(`status/${statusId}`, status);
  return data;
};

export const deleteStatus = async (statusId) => {
  const { data } = await axios.delete(`status/${statusId}`);
  return data;
};

export const restoreStatus = async (statusId) => {
  const { data } = await axios.post(`status/${statusId}/restore`);
  return data;
};