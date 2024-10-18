import axios from "./axios";

export const getAlertsByCaseId = async (caseId) => {
  const { data } = await axios.get(`alerts/${caseId}`);
  return data;
};