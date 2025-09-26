// centralize API calls
import axios from "axios";

const BASE = import.meta.env.VITE_API_URL || "https://catalogo-app.onrender.com/api"; // change if needed

const instance = axios.create({
  baseURL: BASE,
});

export function setAuth(token) {
  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default instance;
