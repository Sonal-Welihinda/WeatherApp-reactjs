import React from "react";
import './logo.css'
import weatherLogo from '../../assets/images/logo.png'


const Logo = () =>{
    return(
        <div className="weather-Logo">
            <img src={weatherLogo} alt="Weather logo" />
        </div>
    );
}

export default Logo