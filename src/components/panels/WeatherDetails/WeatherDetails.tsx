import "./WeatherDetails.styles.scss";
import WeatherDetailsCard from "../../customComponents/WeatherDetailsCard/WeatherDetailsCard";
import { useContext, useState } from "react";
import { weatherContextData } from "../../../App";
import { weatherInfo } from "../../../types/component.types";
import {getWeekDaysFromCurrentDay} from '../../../utils/utils'

const WeatherDetails = () => {

  // State to toggle between Fahrenheit and Celsius
  const [ferenheitSelected, setUnit] = useState<boolean>(true);
  
  // Get weather data from the context
  const weatherContext = useContext<weatherInfo>(weatherContextData);
  const weatherData = weatherContext.weatherData;

  // Functions to convert temperature units
  const convertToFahrenheit = (kelvin: number) =>
    parseInt(String((kelvin - 273.15) * (9 / 5) + 32));

  const convertToCelsius = (kelvin: number) => parseInt(String(kelvin - 273.15));

  // State to control whether to show next weather cards
  const [showNextWeatherCards, setShowNextWeatherCards] = useState(false);

  // Function to get an array of week days starting from the current day
 

  // Function to display default weather cards
  function showDefaultCards() {
    return getWeekDaysFromCurrentDay([], 7, new Date().getDay() + 1, 4).map((day: string,index : number) => {
      return (
        <WeatherDetailsCard
          key = {index}
          day={day}
          ferenheitSelected={ferenheitSelected}
          temp={ferenheitSelected ? convertToFahrenheit(weatherData?.main?.temp) : convertToCelsius(weatherData?.main?.temp)}
        />
      );
    });
  }

  // Function to display next weather cards
  function showNextCards() {
    let today = new Date().getDay(); 
    if (today + 4 >= 6) {
      const diff = (today + 4) - 6;
      today = diff - 1;
    }
    return getWeekDaysFromCurrentDay([], 4, today + 1, 3).map((day: string,index:number) => {
      return (
        <WeatherDetailsCard
          key = {index}
          day={day}
          ferenheitSelected={ferenheitSelected}
          temp={ferenheitSelected ? convertToFahrenheit(weatherData?.main?.temp) : convertToCelsius(weatherData?.main?.temp)}
        />
      );
    });
  }

  return (
    <>

  <section>
    {/* Thematic content goes here */}
    <div className="weather-card">
      {/* Weather temperature and unit */}
      <div className="weather-card__temperature">
        <img src="src/assets/icons/WeatherIcon.png" alt="" />
        <div className="weather-card__temp-reading">
          <span className="weather-card__temp-text">
            {ferenheitSelected ? convertToFahrenheit(weatherData?.main?.temp) : convertToCelsius(weatherData?.main?.temp)}
          </span>
          <span className="weather-card__temp-deg">
            {ferenheitSelected ? "°F" : "°C"}
          </span>
        </div>
      </div>
      {/* Date and time */}
      <time className="weather-card__date">
        {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: '2-digit' })}
      </time>
      <div className="weather-card__day-time">
        <span className="weather-card__day">
          {new Date().toLocaleDateString(undefined, { weekday: 'long' })}
        </span>
        <span className="weather-card__time">
          {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
        </span>
      </div>
      {/* Extra weather information */}
      <section className="weather-card__extra-info">
        {/* Wind information */}
        <div className="weather-card__info-item">
          <img src="/src/assets/icons/wind-direction-icon.svg" alt="" />
          <span className="weather-card__info-label">Wind</span>
          {/* wind in km/hr */}
          <span className="weather-card__info-value">
            {weatherData?.wind?.speed * 3.6} km/hr
          </span>
        </div>
        {/* Humidity information */}
        <div className="weather-card__info-item weather-card__info-item--humidity">
          <img src="/src/assets/icons/hum.svg" alt="" />
          <span className="weather-card__info-label">Hum</span>
          <span className="weather-card__info-value">
            {weatherData?.main?.humidity} %
          </span>
        </div>
        {/* Rain information */}
        <div className="weather-card__info-item weather-card__info-item--rain">
          <img src="/src/assets/icons/Group 656.svg" alt="" />
          <span className="weather-card__info-label">Rain</span>
          {/* "NA" if not rain info is available */}
          <span className="weather-card__info-value">
            {"NA"}
          </span>
        </div>
      </section>
      {/* Daily weather cards */}
      <div className="weather-card__daily-weather">
        {showNextWeatherCards ? (
          showNextCards()
        ) : (
          showDefaultCards()
        )}
        <img
          className="weather-card__next-btn"
          src="/src/assets/icons/Line 17.svg"
          alt=""
          onClick={() => {
            setShowNextWeatherCards(true);
          }}
        />
      </div>
    </div>
  </section>

    {/* Footer content goes here */}
    {/* Temperature unit selection */}
    <div className="weather-card__units">
      <div
        className={`weather-card__unit ${
          ferenheitSelected ? "weather-card__unit--selected" : ""
        }`}
        onClick={() => setUnit(true)}
      >
        °F
      </div>
      <div
        className={`weather-card__unit ${
          !ferenheitSelected ? "weather-card__unit--selected" : ""
        }`}
        onClick={() => setUnit(false)}
      >
        °C
      </div>
    </div>
</>
  );
};

export default WeatherDetails;