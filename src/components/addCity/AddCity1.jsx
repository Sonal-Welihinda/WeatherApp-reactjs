import React from "react";
import "./addCity.css";

function AddCity1 () {
  return (
    <div id="searchBox">
      <input
        type="text"
        name="searchCities"
        id="citySearchIP"
        alt="gfd"
        placeholder="Enter a city"
      />
      <input type="button" value="Add City" id="searchBtn" />
    </div>
  );
};

export default AddCity1;
