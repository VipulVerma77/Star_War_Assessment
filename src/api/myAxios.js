import axios from "axios";

const myAxios = axios.create({
  baseURL: "https://swapi.dev/api",
  timeout: 10000,
});


myAxios.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem("mock_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

myAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error);
    return Promise.reject(error);
  }
);

export default myAxios;
