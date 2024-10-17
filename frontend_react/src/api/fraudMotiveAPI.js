import axios from "./axios";

export const getFraudMotiveById = async (motiveFraudId) => {
  const { data } = await axios.get(`fraudmotive/${motiveFraudId}`);
  return data;
};

export const getAllFraudMotives = async () => {
  const { data } = await axios.get(`fraudmotives`);
  return data;
};

export const createFraudMotive = async (fraudMotive) => {
  const { data } = await axios.post(`fraudmotive`, fraudMotive);
  return data;
};

export const updateFraudMotive = async (motiveFraudId, fraudMotive) => {
  const { data } = await axios.put(`fraudmotive/${motiveFraudId}`, fraudMotive);
  return data;
};

export const deleteFraudMotive = async (motiveFraudId) => {
  const { data } = await axios.delete(`fraudmotive/${motiveFraudId}`);
  return data;
};

export const restoreFraudMotive = async (motiveFraudId) => {
  const { data } = await axios.post(`fraudmotive/${motiveFraudId}/restore`);
  return data;
};