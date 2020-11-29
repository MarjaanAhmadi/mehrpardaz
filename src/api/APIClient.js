import axios from "axios";

let links = {
  baseUrl: "/api",
};
const { baseUrl } = links;

const defaultOptions = {
  baseURL: baseUrl,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
};

let instance = axios.create(defaultOptions);

instance.interceptors.request.use(function (config) {
  const token = sessionStorage.getItem("token");
  config.headers.Authorization = token ? `${token}` : "";
  return config;
});

export default instance;
