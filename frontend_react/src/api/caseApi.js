import axios from "./axios";

export const getCaseById = async (caseId) => {
  const { data } = await axios.get(`cases/${caseId}`);
  return data;
};

export const getCasesInEvaluation = async (analystId) => {
  const { data } = await axios.get(`cases/evaluation/${analystId}`);
  return data;
};