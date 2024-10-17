import axios from "axios";

const urlBackend = import.meta.env.VITE_URL_BACKEND;

const instance = axios.create({  
  baseURL: urlBackend,
  withCredentials: true,
});

export default instance;
