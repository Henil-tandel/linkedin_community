// src/services/api.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api", // Match backend port
});

export default instance;
