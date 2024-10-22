import axios from "./axios";

// Obtener documentos por ID de caso
export const getDocumentsByCaseId = async (caseId) => {
  const { data } = await axios.get(`documents/${caseId}`);
  return data;
};

// Añadir información de un documento al caso (sin archivo)
export const addDocumentToCase = async (formData) => {

  console.log(formData.get("document"));
  const response = await axios.post('documents/upload', formData);

  console.log("Documentos subidos:", response.data);
  
  return response;
};

