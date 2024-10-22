import axios from "./axios";

export const getDocumentsByCaseId = async (caseId) => {
  const { data } = await axios.get(`documents/${caseId}`);
  return data;
};

export const addDocumentToCase = async (formData) => {
  console.log(formData.get("document"));
  const response = await axios.post("documents/upload", formData);
  console.log("Documentos subidos:", response.data);
  return response;
};

export const deleteDocumentById = async (documentId) => {
  const { data } = await axios.delete(`documents/${documentId}`);
  return data;
};
