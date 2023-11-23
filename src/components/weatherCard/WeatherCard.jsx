import React from "react";
import "./weatherCard.css";
import "./wc-top-bg.css";
import closeIcon from "../../assets/images/close.png";
import backArrowIcon from "../../assets/images/backArrow.png";
import directionIcon from "../../assets/images/direction.png";
import {monthsListInShort, getAmPm, cardBgColors, timeConverterParam, defualtCardBgColor, weatherCardOnClickMethods, weatherConditionIcon} from "../../constants.js";

function timeConverter(UNIX_timestamp, param) {
  var a = new Date(UNIX_timestamp * 1000);

  // monthsListInShort array is import from constants.js file
  var month = monthsListInShort[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();

  // getAmPM Method is imported from constants.js file
  var ampm = getAmPm(hour);
  hour = hour % 12;
  hour = hour ? hour : 12;
  var min = a.getMinutes();


  if (param == timeConverterParam.date) {
    var time = hour + "." + min + " " + ampm + ", " + month + " " + date;
    return time;
  } else if (param == timeConverterParam.time) {
    var time = hour + "." + min + " " + ampm;
    return time;
  }

  return "null";
}


var whichMethod = weatherCardOnClickMethods.Empty;
function onClickWeatherCardOpen(weatherCityCode) {
  let getAllWeatherCards = document.getElementsByClassName("weather-card");

  if (whichMethod == weatherCardOnClickMethods.Close || whichMethod == weatherCardOnClickMethods.Remove) {
    whichMethod = weatherCardOnClickMethods.Empty;
    return;
  }

  for (let i = 0; i < getAllWeatherCards.length; i++) {
    if (getAllWeatherCards[i].id != weatherCityCode) {
      getAllWeatherCards[i].classList.add("hideCard");
    } else {
      getAllWeatherCards[i].classList.add("active");
    }
  }
}

function onClickWeatherCardClose(weatherCityCode) {
  whichMethod = weatherCardOnClickMethods.Close;

  let getAllWeatherCards = document.getElementsByClassName("weather-card");

  for (let i = 0; i < getAllWeatherCards.length; i++) {
    if (getAllWeatherCards[i].id != weatherCityCode) {
      getAllWeatherCards[i].classList.remove("hideCard");

    } else {
      getAllWeatherCards[i].classList.remove("active");

    }
  }
}


// Component
function WeatherCard ({ weatherDATA, onRemove }) {


  // extracting weatherDATA into veriables
  let cityCode = weatherDATA.list[0]["id"];
  let humidity = weatherDATA.list[0]["main"]["humidity"];
  let pressure = weatherDATA.list[0]["main"]["pressure"];
  let temp = weatherDATA.list[0]["main"]["temp"];
  let temp_max = weatherDATA.list[0]["main"]["temp_max"];
  let temp_min = weatherDATA.list[0]["main"]["temp_min"];
  let country = weatherDATA.list[0]["sys"]["country"];
  let sunrise = weatherDATA.list[0]["sys"]["sunrise"];
  let sunset = weatherDATA.list[0]["sys"]["sunset"];
  let cityName = weatherDATA.list[0]["name"];
  let visibility = weatherDATA.list[0]["visibility"];
  let date = weatherDATA.list[0]["dt"];
  let icon = weatherDATA.list[0]["weather"][0]["icon"];
  let description = weatherDATA.list[0]["weather"][0]["description"];
  let windDeg = weatherDATA.list[0]["wind"]["deg"];
  let windSpeed = weatherDATA.list[0]["wind"]["speed"];

  return (
    <div
      className="weather-card"
      key={cityCode}
      id={cityCode}
      onClick={() => onClickWeatherCardOpen(cityCode)}
      >
      {/* // <!-- card top --> */}
      <div
        className="wc-top"
        style={{ "--bg-color": cardBgColors[description] ?? defualtCardBgColor }}
      >
        <div className="wc-topTop">
          <div className="wc-backbtn">
            <img
              src={backArrowIcon}
              alt="go back"
              onClick={() => onClickWeatherCardClose(cityCode)}
            />
          </div>

          <div>
            <div className="wc-location">{cityName + ", " + country}</div>

            <div className="wc-Time">{timeConverter(date, timeConverterParam.date)}</div>
          </div>

          <div className="wc-close">
            <img
              src={closeIcon}
              alt="close"
              onClick={() => onRemove()}
            />
          </div>
        </div>
        {/* // <!-- card top left side --> */}
        <div className="wc-topMid">
          <div className="wc-topL">
            <div className="wc-location">{cityName + ", " + country}</div>

            <div className="wc-Time">{timeConverter(date, timeConverterParam.date)}</div>

            <div className="wc-status">
              <img
                src={weatherConditionIcon(icon)}
                alt="description Icon"
              />
              <span>{description}</span>
            </div>
          </div>

          {/* // <!-- card top right side --> */}
          <div className="wc-topR">
            {/* // <!-- avg temprature  --> */}
            <div className="wc-tempAvg">{temp + "\u00B0" + "c"}</div>

            {/* // <!-- min temprature  --> */}
            <div>
              Temp Min:
              <div className="wc-tempMin">{temp_min + "\u00B0" + "c"}</div>
            </div>

            {/* // <!-- Max temprature  --> */}
            <div>
              Temp Max:
              <div className="wc-tempMax">{temp_max + "\u00B0" + "c"}</div>
            </div>
          </div>
        </div>
      </div>

      {/* // <!-- card bottom --> */}
      <div className="wc-bottom">
        {/* // <!-- card bottom left --> */}
        <div className="wc-bottom-left">
          <div>
            <b>Pressure : &nbsp;</b>
            <div className="wc-Pressure">{+pressure + "hPa"}</div>
          </div>
          <div>
            <b>Humidity :</b> <div className="wc-Humidity">{humidity + "%"}</div>
          </div>
          <div>
            <b>visibility :&nbsp;</b>
            <div className="wc-visibility">
              {(visibility / 1000).toFixed(1) + " KM"}
            </div>
          </div>
        </div>

        {/* // <!-- card bottom mid --> */}
        <div className="wc-bottom-mid">
          <img
            src={directionIcon}
            alt="direction"
          />
          <div>
            {windSpeed + "m/s "}
            <br className="hiddenBrake" />
            {windDeg + " degrees"}
          </div>
        </div>

        {/* // <!-- card right --> */}
        <div className="wc-bottom-right">
          <div>
            <b>Sunrise:</b>
            <div className="wc-Sunrise">{timeConverter(sunrise, timeConverterParam.time)}</div>
          </div>

          <div>
            <b>Sunset:</b>
            <div className="wc-Sunset">{timeConverter(sunset, timeConverterParam.time)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
