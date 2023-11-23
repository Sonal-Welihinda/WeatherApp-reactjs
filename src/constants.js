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

export const getAmPm = (hour) =>{
    return hour >= 12 ? "pm" : "am";
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

export const weatherCacheKey = "weatherData";

export const weatherApiUnits = "metric";

export const weatherConditionIcon = (icon)=>{
    return "https://openweathermap.org/img/wn/"+icon+"@2x.png";
}