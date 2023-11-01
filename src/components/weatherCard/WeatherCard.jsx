import React from "react";
import './weatherCard.css'


function timeConverter(UNIX_timestamp,param){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var ampm = hour >= 12 ? 'pm' : 'am';
    hour = hour % 12;
    hour = hour ? hour:12;
    var min = a.getMinutes();
    var sec = a.getSeconds();

    if(param=="DATE"){
        var time = hour + '.' + min + ' ' + ampm + ', ' + month + ' ' + date;
        return time;
    }else if(param=="TIME"){
        // if(){

        // }
        var time = hour + '.' + min + ' ' + ampm;
        return time;
    }

    
    return "null";
}

var bgColors = {
    "few clouds":"#388ee7",
    "clear sky":"#40b681",
    "light rain":"#de944e",
    "scattered clouds":"#7c783b",
    "broken clouds":"#6249cc",
    "shower rain":"#0041d6",
    "rain":"#001b71",
    "thunderstorm":"#000c32",
    "snow":"#91c7ff",
    "mist":"#9c3a3a"
}


var whichMethod = "";
function onClickWeatherCardOpen(weatherCityCode){
    let getAllWeatherCards = document.getElementsByClassName("weather-card");
    
    if(whichMethod=="Close"||whichMethod=="Remove"){
        whichMethod = "";
        return;
    }

    for(let i =0;i<getAllWeatherCards.length;i++){


        if(getAllWeatherCards[i].id != weatherCityCode){

            getAllWeatherCards[i].classList.add("hideCard");
            
        }else{
            getAllWeatherCards[i].classList.add("active");

        }
    }
}


function onClickWeatherCardClose(weatherCityCode,event){
   
    whichMethod = "Close";

    let getAllWeatherCards = document.getElementsByClassName("weather-card");
    

    for(let i =0;i<getAllWeatherCards.length;i++){

        if(getAllWeatherCards[i].id != weatherCityCode){
            getAllWeatherCards[i].classList.remove("hideCard");
            // console.log("rev");
            
        }else{
            getAllWeatherCards[i].classList.remove("active");
            // console.log("revmove");

        }
    }

    

}

function removeWeatherCard(weatherCityCode){
    whichMethod = "Remove";
    var weatherCard = document.getElementById(weatherCityCode);
    // weatherCard.remove();
}



const WeatherCard = ({weatherDATA, onRemove}) =>{

    // weatherData = props.weatherDATA;id
    let cityCode = weatherDATA.list[0]['id'];
    let feelLike = weatherDATA.list[0]['main']['feels_like'];
    let humidity = weatherDATA.list[0]['main']['humidity'];
    let pressure = weatherDATA.list[0]['main']['pressure'];
    let temp = weatherDATA.list[0]['main']['temp'];
    let temp_max = weatherDATA.list[0]['main']['temp_max'];
    let temp_min = weatherDATA.list[0]['main']['temp_min'];
    let country = weatherDATA.list[0]['sys']['country'];
    let sunrise = weatherDATA.list[0]['sys']['sunrise'];
    let sunset = weatherDATA.list[0]['sys']['sunset'];
    let cityName = weatherDATA.list[0]['name'];
    let visibility = weatherDATA.list[0]['visibility'];
    let date = weatherDATA.list[0]['dt'];
    let icon = weatherDATA.list[0]['weather'][0]['icon'];
    let description = weatherDATA.list[0]['weather'][0]['description'];
    let windDeg = weatherDATA.list[0]['wind']['deg'];
    let windSpeed = weatherDATA.list[0]['wind']['speed']


    




    return(
        <div className="weather-card" key={cityCode} id={cityCode} onClick={()=> onClickWeatherCardOpen(cityCode)} >
        {/* // <!-- card top --> */}
            <div className="wc-top" style ={{"backgroundColor":(bgColors[description]??"#388ee7")}} >

                <div className="wc-topTop" >
                    <div className="wc-backbtn">
                        <img src={require('../../assets/images/backArrow.png')} alt="go back" onClick={() =>onClickWeatherCardClose(cityCode)} />
                    </div>


                    <div>

                        <div className="wc-location">
                            {cityName+ ", "+country}
                        </div>


                        <div className="wc-Time">
                            {timeConverter(date,"DATE")}
                        </div>

                    </div>

                    <div className="wc-close">
                        <img src={require('../../assets/images/close.png')} alt="close" onClick={()=>onRemove()} />
                    </div>

                </div>
                {/* // <!-- card top left side --> */}
                <div className="wc-topMid">

                    <div className="wc-topL">
                        <div className="wc-location">
                            {cityName+ ", "+country}
                        </div>


                        <div className="wc-Time">
                            {timeConverter(date,"DATE")}
                        </div>

                        <div className="wc-status">
                            <img src={"https://openweathermap.org/img/wn/"+icon+"@2x.png"} alt="description Icon"/>
                            <span>{description}</span>
                            
                        </div>

                    </div>

                    {/* // <!-- card top right side --> */}
                    <div className="wc-topR">

                        {/* // <!-- avg temprature  --> */}
                        <div className="wc-tempAvg">
                            {temp+"\u00B0"+"c"}
                        </div>

                        {/* // <!-- min temprature  --> */}
                        <div >
                            Temp Min: 
                            <div className="wc-tempMin">
                                {temp_min+"\u00B0"+"c"}
                            </div>
                        </div>

                        {/* // <!-- Max temprature  --> */}
                        <div >
                            Temp Max: 
                            <div className="wc-tempMax">
                                {temp_max+"\u00B0"+"c"}
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        {/* // <!-- card bottom --> */}
            <div className="wc-bottom">

                {/* // <!-- card bottom left --> */}
                <div className="wc-bottom-left">
                    <div><b>Pressure:</b> <div className="wc-Pressure">{+pressure+"hPa"}</div></div>
                    <div><b>Humidity:</b> <div className="wc-Humidity">{humidity+"%"}</div></div>
                    <div><b>visibility :</b> <div className="wc-visibility">{(visibility/1000).toFixed(1)+" KM"}</div> </div>
                </div>

                {/* // <!-- card bottom mid --> */}
                <div className="wc-bottom-mid">
                    <img src={require('../../assets/images/direction.png')} alt="direction" />
                    <div>
                        {windSpeed+"m/s "}<br className="hiddenBrake"/>{windDeg+" degrees"}
                    </div>
                </div>

                {/* // <!-- card right --> */}
                <div className="wc-bottom-right">
                    <div>
                        <b>Sunrise:</b>
                        <div className="wc-Sunrise">
                        {timeConverter(sunrise,"TIME")}</div>
                    </div>

                    
                    <div>
                        <b>Sunset:</b>
                        <div className="wc-Sunset">{timeConverter(sunset,"TIME")}</div>
                    </div>

                </div>

            </div>
        

        </div>
    );
}

export default WeatherCard