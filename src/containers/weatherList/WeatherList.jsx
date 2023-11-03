import React, { useEffect, useState } from "react";
import weatherApiKey from './creds'
// require('dotenv').config()

// import { QueryClient, QueryClientProvider } from 'react-query';

// import {caches} from "react";
// import {useQuery} from 'react-query'
import './weatherList.css';
import {WeatherCard} from '../../components';

import citiesFile from './cities.json';
// var apiCache = {};

// API call
async function weatherApiCall(cityCode){
    if(cityCode == null){
        return 403;
    }
    
    let params = {
        id: cityCode,
        units: "metric",
        appid: process.env.REACT_APP_API_KEY
    };
    
    // Create a URLSearchParams instance from the object
    let query = new URLSearchParams(params);

    // Append the query string to the base URL
    let url = 'http://api.openweathermap.org/data/2.5/group?' + query.toString();

    

    try {
        const cache = await caches.open("weatherData");
        const cachedResponse = await cache.match(url);
    
        if (cachedResponse) {
          console.log("Using Cache");
          const data = await cachedResponse.json();
          return data;
        }
    
        const response = await fetch(url);
        if (response.ok) {
          const responseClone = response.clone();
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


// export function weatherApiCallRQ(cityCode){
//     const {isLoading,data,isError,error} = useQuery("weather1",weatherApiCall(cityCode));

//     if(isError){
//         console.log(error);
//     }

//     return (
//         <WeatherCard weatherDATA={data} onRemove={(e) =>removeCity(data)}/>
//     )

// }


// var weatherCards = [];


async function getCityCodes () {

    let weatherCards = [];

    for(let i =0;i<citiesFile.List.length;i++){

        let weatherData = await weatherApiCall(citiesFile.List[i]["CityCode"]);

        weatherCards.push(weatherData);

    }



    // console.log("test 1");

    return weatherCards;
}

async function cacheMangement(){
    setInterval(async function(){
        try {
            const cache = await caches.open("weatherData");
            const keys = await cache.keys();
            for (let key of keys) {
              await cache.delete(key);
            }
        } catch (error) {
        console.error("Cache management error: " + error);
        }
    },  300000);
}


const WeatherList = () =>{

    const [weatherCardsState,setWeatherCards] = useState([]);

    // get data.json file and call the api
    

    async function getCitisCallback(){
        setWeatherCards([... await getCityCodes()]);
        
    }
    

    async function removeCity(removeitem){
        const newList = weatherCardsState.filter((item) => item != removeitem);

        setWeatherCards([...newList]);
    }



    useEffect(()  =>{
        // console.log("test 2");
        
        getCitisCallback();
        cacheMangement();
        
        },
        []
    )
    

    return(
        // {}queryClient
        
        
        <div id="weatherListContainer">
            {
                
                weatherCardsState.map((item) => (
                    // console.log(item)
                    <WeatherCard weatherDATA={item} onRemove={(e) =>removeCity(item)}/>
                ))
                
                

            }

        </div>
    );
}

export default WeatherList;