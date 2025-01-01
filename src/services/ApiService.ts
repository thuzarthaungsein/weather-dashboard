import { API_TOKEN } from "../utils/helpers";
import http from "../utils/http";

const getWeatherData = async (city: string) => {
  try {
    const response = await http.get(
      `/data/2.5/weather?q=${city}&appid=${API_TOKEN}&units=metric`
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log("Error Status Code:", error.response.status);
      console.log("Error Data:", error.response.data);
      return error.response.data.message;
    } else if (error.request) {
      console.log("No response received:", error.request);
      return "No response received";
    } else {
      console.log("Error Message:", error.message);
      return error.message;
    }
  }
};

const ApiService = {
  getWeatherData,
};

export default ApiService;
