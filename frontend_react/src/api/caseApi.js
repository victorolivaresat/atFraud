import axios from "./axios";

export const getCaseById = async (caseId) => {
  const { data } = await axios.get(`cases/${caseId}`);
  return data;
};

export const getCasesInEvaluation = async (analystId) => {
  const { data } = await axios.get(`cases/evaluation/${analystId}`);
  return data;
};

export const updateCaseEvaluation = async (caseId, newComment, newAmount, newFraudMotiveId, newStatusId) => {
  const { data } = await axios.put(`cases/evaluation/${caseId}`, {
    newComment,
    newAmount,
    newFraudMotiveId,
    newStatusId
  });
  return data;
};

export const getEvaluationsAttended = async (analystId) => {
  const { data } = await axios.get(`cases/evaluation/attended/${analystId}`);
  return data;
};

export const getEvaluationsPending = async (analystId) => {
  const { data } = await axios.get(`cases/evaluation/pending/${analystId}`);
  return data;
};