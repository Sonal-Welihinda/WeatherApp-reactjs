import React from "react";
import "./logo.css";
import weatherLogo from "../../assets/images/logo.png";

function Logo () {
  return (
    // to show the logo
    <div className="weather-Logo">
      <img src={weatherLogo} alt="Weather logo" />
    </div>
  );
};

export default Logo;
