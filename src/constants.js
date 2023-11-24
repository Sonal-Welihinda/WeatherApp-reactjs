export const API_URL = "http://api.openweathermap.org/data/2.5/group?";

export const monthsListInShort = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

export function timeConverter(UNIX_timestamp, param) {
    var dateObj = new Date(UNIX_timestamp * 1000);
  
    // monthsListInShort array is import from constants.js file
    var month = monthsListInShort[dateObj.getMonth()];
    var date = dateObj.getDate();
    var hour = dateObj.getHours();
  
    // getAmPM Method is imported from constants.js file
    var ampm = hour >= 12 ? "pm" : "am";;
    hour = hour % 12;
    hour = hour ? hour : 12;
    var min = dateObj.getMinutes();
  
  
    if (param == timeConverterParam.date) {
      var time = hour + "." + min + " " + ampm + ", " + month + " " + date;
      return time;
    } else if (param == timeConverterParam.time) {
      var time = hour + "." + min + " " + ampm;
      return time;
    }
  
    return "null";
}

export const cardBgColors = {
    "few clouds": "#388ee7",
    "clear sky": "#40b681",
    "light rain": "#de944e",
    "scattered clouds": "#7c783b",
    "broken clouds": "#6249cc",
    "shower rain": "#0041d6",
    "rain": "#001b71",
    "thunderstorm": "#000c32",
    "snow": "#91c7ff",
    "mist": "#9c3a3a",
  };

export const timeConverterParam = {
    date:"DATE",
    time:"TIME"
}

export const defualtCardBgColor = "#388ee7";

export const weatherCardOnClickMethods = {
    Close:"Close",
    Remove:"Remove",
    Empty:""
}

// this used in WeatherList.jsx and apiHelper.jsx
export const weatherCacheKey = "weatherData";
// this used in apiHelper.jsx
export const weatherApiUnits = "metric";

// this will return weather condtion icon url
export const weatherConditionIcon = (icon)=>{
    return "https://openweathermap.org/img/wn/"+icon+"@2x.png";
}