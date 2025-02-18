import React, { useState, useEffect } from "react";
import "./weather.css";

const API_KEY = "b18248a3c631251c6578a3e08d65163e"; // Replace with your OpenWeather API Key
const CITY = "Delhi"; // Default city, can be changed dynamically

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState(CITY);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const fetchWeather = async (cityName) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${b18248a3c631251c6578a3e08d65163e}&units=metric`
      );
      const data = await response.json();
      if (data.cod === 200) {
        setWeatherData(data);
      } else {
        alert("City not found");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setCity(search);
      setSearch("");
    }
  };

  return (
    <div className="weather-container">
      <div className="weather-left">
        <h2 className="location">{weatherData?.name}, {weatherData?.sys?.country}</h2>
        <div className="time-date">
          <p>{new Date().toLocaleTimeString()}</p>
          <p>{new Date().toLocaleDateString()}</p>
        </div>
        <h1 className="temperature">{weatherData?.main?.temp}°C</h1>
      </div>

      <div className="weather-right">
        <div className="weather-status">
          <h2>☀ {weatherData?.weather[0]?.main}</h2>
          <input 
            type="text" 
            placeholder="Search city..." 
            className="search-box" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>
        <div className="weather-details">
          <p><strong>{weatherData?.name}, {weatherData?.sys?.country}</strong></p>
          <p>Temperature: {weatherData?.main?.temp}°C</p>
          <p>Humidity: {weatherData?.main?.humidity}%</p>
          <p>Visibility: {weatherData?.visibility / 1000} km</p>
          <p>Wind Speed: {weatherData?.wind?.speed} km/h</p>
        </div>
      </div>
    </div>
  );
};

export default Weather;
