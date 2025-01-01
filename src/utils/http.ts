import axios from "axios";
import { API_BASEURL } from "./helpers";

const http = axios.create({
  baseURL: API_BASEURL,
});

// http.interceptors.request.use(
//   async (config) => {
//     if (API_TOKEN) {
//       config.headers.Authorization = `Bearer ${API_TOKEN}`;
//     }
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

export default http;
