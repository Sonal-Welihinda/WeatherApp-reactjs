import React, { useEffect, useState } from "react";
import "./weatherList.css";
import { WeatherCard } from "../../components";

// importing API helper methods
import { getAPIURL } from "./APIHelper.js";
import citiesFile from "./cities.json";

// API call
async function weatherApiCall(cityCode) {
  if (cityCode == null) {
    return 403;
  }

  // Using ApiHelper to get url with parameters
  let url = getAPIURL(cityCode);

  try {
    let cache = await caches.open("weatherData");
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
  }
}

// * in this function is will go through cities.json file and get CityCode 
//   then make Api call using weatherApiCall add respond to weatherCards array and return the whole array
async function getCityCodesWeather() {
  let weatherCards = [];

  for (let i = 0; i < citiesFile.List.length; i++) {
    let weatherData = await weatherApiCall(citiesFile.List[i]["CityCode"]);

    weatherCards.push(weatherData);
  }

  return weatherCards;
}

async function cacheMangement() {
  // using set Interval to clear the cache every 5m
  setInterval(async function () {
    try {
      let cache = await caches.open("weatherData");
      let keys = await cache.keys();
      for (let key of keys) {
        await cache.delete(key);
      }
    } catch (error) {
      console.error("Cache management error: " + error);
    }
  }, 300000);
}

// Container
function WeatherList () {
  // in here weatherCardsState will have the all the card data and using setWeatherCards funtion we can set the list
  // this can't be created in the top-level
  let [weatherCardsState, setWeatherCards] = useState([]);

  // get data.json file and call the api
  async function getCitisCallback() {
    setWeatherCards([...(await getCityCodesWeather())]);
  }

  // remove city function
  // this will remove city from the ui
  async function removeCity(removeitem) {
    let newList = weatherCardsState.filter((item) => item != removeitem);

    setWeatherCards([...newList]);
  }

  useEffect(() => {
    // calling the above getCitisCallback function to get the data from json and display it
    getCitisCallback();

    // in here actives the cache management
    cacheMangement();
  }, []);

  return (
    // in here inside the weatherListContainer div putting weatherCards
    <div id="weatherListContainer">
      {weatherCardsState.map((item) => (
        <WeatherCard weatherDATA={item} onRemove={(e) => removeCity(item)} />
      ))}
    </div>
  );
};

export default WeatherList;
