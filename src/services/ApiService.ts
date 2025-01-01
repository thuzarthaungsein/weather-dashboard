import http from "../utils/http";

const getWeatherData = async () => {
  const response = await http.get("");
  return response.data;
};

const ApiService = {
  getWeatherData,
};

export default ApiService;
