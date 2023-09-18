// Import necessary dependencies and styles
import { useContext, useState } from "react";
import SunCycleDetails from "../../customComponents/SunCycleDetails/SunCycleDetails";
import "./extras.styles.scss";
import { weatherContextData } from "../../../App";
import { weatherInfo } from "../../../types/component.types";
import EnvironmentalHealthInfo from "../../customComponents/EnvironmentalHealthInfo/EnvironmentalHealthInfo";

// Define a functional component called WeatherExtras
const WeatherExtras = () => {
    // State to control the expansion of the search input
    const [isExpand, setIsExpand] = useState<boolean>(false);

    // Get weather data from the context
    const weatherContext: {
        weatherData: weatherInfo;
        setData: React.Dispatch<React.SetStateAction<weatherInfo>>;
    } = useContext(weatherContextData);

    const weatherData = weatherContext.weatherData;

    // Function to toggle the search input expansion
    const expandSearch = () => {
        setIsExpand(!isExpand);
    }

    // Function to fetch weather data for a given city
    const getSearchedData = ((cityName: string) => {
        if (cityName) {
            // Construct the API URL with the city name and API key
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${import.meta.env.VITE_APP_WEATHER_KEY}`;
            
            // Fetch weather data from the API
            fetch(apiUrl)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    // Extracted location data from the response
                    weatherContext.setData(data);
                })
                .catch((error) => {
                    console.error('There was a problem with the fetch operation:', error);
                });
        }
    });

    return (
      <div className="extrasMain">
        {/* Header section */}
        <header className="extrasMain__header">
          {isExpand ? (
            ""
          ) : (
            <div className="extrasMain__location location">
              <img
                src="/src/assets/icons/location.svg"
                alt=""
                className="location__icon"
              />
              <span className="location__text">
                {weatherData?.name + " " + weatherData?.sys?.country}
              </span>
            </div>
          )}
          <nav className="extrasMain__search">
            {/* Search input */}
            <input
              className={`searchInput ${
                isExpand ? "searchInput-wide" : ""
              }`}
              type="text"
              placeholder=""
              onChange={(e) => {
                getSearchedData(e.target.value);
              }}
            />
            {/* Search button */}
            <img
              src="/src/assets/icons/search (2).svg"
              alt=""
              className="searchLogo"
              onClick={() => expandSearch()}
            />
          </nav>
        </header>
    
        {/* Time section */}
        <section className="extrasMain__timeSection">
          {/* Sunrise time */}
          <div className="timeCardDiv smallCard">
            <span className="timeSection__label">Sunrise</span>
            <figure className="timeCard smallTimeCard">
              <SunCycleDetails
                className="timeCard smallTimeCard"
                showLargeSizeWidget={false}
                sunSetOrsunRise={weatherData?.sys?.sunrise}              />
            </figure>
          </div>
          {/* Golden hour */}
          <div className="timeCardDiv">
            <span className="timeSection__label">Golden Hour</span>
            <figure className="timeCard largeTimeCard">
              <SunCycleDetails
              className="timeCard smallTimeCard"
                showLargeSizeWidget={true}
                sunSetOrsunRise={0}
              />
            </figure>
          </div>
          {/* Sunset time */}
          <div className="timeCardDiv smallCard">
            <span className="timeSection__label">Sunset</span>
            <figure className="timeCard smallTimeCard">
              <SunCycleDetails
               className="timeCard smallTimeCard"
                showLargeSizeWidget={false}
                sunSetOrsunRise={weatherData?.sys?.sunset}
              />
            </figure>
          </div>
        </section>
    
        {/* Info section */}
        <section className="extrasMain__infoSection infoSection">
          {/* Dividing line */}
          <div className="infoSection__dividingLine dividingLine"></div>
          {/* Info icon */}
          <div className="infoSection__infoIcon infoIcon">
            <span>i</span>
          </div>
        </section>
    
        {/* Environmental health index section */}
        <section className="extrasMain__indexSection indexSection">
          {/* Air Quality index */}
          <div className="indexSection__indexEle indexEle">
            <span className="indexEle__indexName">Air Quality</span>
            <figure className="indexEle__indexDetails">
              <EnvironmentalHealthInfo />
            </figure>
          </div>
          {/* UV Index */}
          <div className="indexSection__indexEle indexEle">
            <span className="indexEle__indexName">UV Index</span>
            <figure className="indexEle__indexDetails">
              <EnvironmentalHealthInfo />
            </figure>
          </div>
        </section>
      </div>
    );
               
}

// Export the WeatherExtras component as the default export
export default WeatherExtras;
