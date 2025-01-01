import axios from "axios";

const http = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default http;
