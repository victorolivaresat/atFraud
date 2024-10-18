import axios from "./axios";

export const getDocumentsByCaseId = async (caseId) => {
  const { data } = await axios.get(`documents/${caseId}`);
  return data;
};