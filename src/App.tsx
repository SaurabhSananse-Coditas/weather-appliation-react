/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react"
import Home from "./Pages/home/home"
import { weatherInfo } from './types/component.types'
import {Location } from './types/component.types'
import { weather } from "./state/weatherInitialState";


export const weatherContextData   = createContext<weatherInfo>({
  "coord": {
    "lon": 0,
    "lat": 0
},
"weather": [
    {
        "id": 0,
        "main": '',
        "description": '',
        "icon":''
    }
],
"base": '',
"main": {
    "temp":  0,
    "feels_like":  0,
    "temp_min":  0,
    "temp_max":  0,
    "pressure":  0,
    "humidity": 0,
    "sea_level":  0,
    "grnd_level":  0
},
"visibility":  0,
"wind": {
    "speed":  0,
    "deg":  0,
    "gust":  0
},
"clouds": {
    "all":  0
},
"dt":  0,
"sys": {
    "type": 0,
    "id":  0,
    "country": '',
    "sunrise":  0,
    "sunset":  0
},
"timezone": 0,
"id": 0,
"name": '',
"cod":  0
});


const App = () => {
  const [weatherData,setData] = useState<weatherInfo>(weather)
  const [location, setLocation] = useState<Location>({
    latitude: null,
    longitude: null,
    error: null,
  });

  const getCurrentLocation = () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null,
              });
          },
          () => {
            setLocation({
                latitude: null,
                longitude: null,
                error: "Geolocation is not available in your browser",
              });
          }
        );
      } else {
        setLocation({
            latitude: null,
            longitude: null,
            error: "Geolocation is not available in your browser",
          });
      }
  }

  const getCurrentWeatherInfo =  () => {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${import.meta.env.VITE_APP_WEATHER_KEY}`;
      // Make a fetch call to the API
      fetch(apiUrl)
      .then((response) => {
          if (!response.ok) {
          throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then((data) => {
          // Handle the JSON response data
          setData(data);
      })
      .catch((error) => {
          console.error('There was a problem with the fetch operation:', error);
      });
  }

  
  useEffect(()=>{
    getCurrentLocation()
    if (location.latitude !== null && location.longitude !== null) {
        getCurrentWeatherInfo();
      }
  },[location.latitude,location.longitude])

  return (
    <>
    <weatherContextData.Provider value={{weatherData,setData}}>
    <Home />
    </weatherContextData.Provider>
    </>
  )
}

export default App