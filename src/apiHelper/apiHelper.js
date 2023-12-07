import { API_URL, weatherCacheKey ,weatherApiUnits} from "../constants";

// Export a function that takes a path and returns the full URL
export async function getWeatherDataByCityCode(cityCode) {
  let params = {
    id: cityCode,
    units: weatherApiUnits,
    appid: process.env.REACT_APP_API_KEY,
  };

  let query = new URLSearchParams(params);

  let url = API_URL + query.toString();

  try {
    let cache = await caches.open(weatherCacheKey);
    let cachedResponse = await cache.match(url);

    if (cachedResponse) {
      console.log("Using Cache");
      let data = await cachedResponse.json();
      return data;
    }

    let response = await fetch(url);
    if (response.ok) {
      let responseClone = response.clone();
      console.log("Adding Cache");
      await cache.put(url, responseClone);
      return response.json();
    } else {
      console.error("API request failed.");
    }
  } catch (error) {
    // Handle the error
    console.error(error);
    return [];
  }
  
}
