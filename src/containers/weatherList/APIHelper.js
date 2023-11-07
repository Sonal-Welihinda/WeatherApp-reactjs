import { API_URL } from "../../constants";

// Export a function that takes a path and returns the full URL
export function getAPIURL(cityCode) {
  let params = {
    id: cityCode,
    units: "metric",
    appid: process.env.REACT_APP_API_KEY,
  };

  // Create a URLSearchParams instance from the object
  let query = new URLSearchParams(params);
  return API_URL + query.toString();
}
