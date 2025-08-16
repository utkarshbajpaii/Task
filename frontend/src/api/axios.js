// import axios from "axios";

// const api = axios.create({
//   baseURL: process.env.REACT_APP_API_URL
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default api;
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // or your backend base URL
});

// Add Authorization header for all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

