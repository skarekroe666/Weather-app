import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from "../assets/search.png"
import clear_icon from "../assets/clear.png"
import cloudy_icon from "../assets/cloudy.png"
import drizzle_icon from "../assets/drizzle.png"
import rain_icon from "../assets/rain.png"
import snow_icon from "../assets/snow.png"
import windy_icon from "../assets/windy.png"
import humidity_icon from "../assets/humidity.png"

const Weather = () => {
    
    const inputRef = useRef()

    const [weatherData, setweatherData] = useState(false);

    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloudy_icon,
        "02n": cloudy_icon,
        "03d": cloudy_icon,
        "03n": cloudy_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
    }

    const search = async(city) => {

        if(city === "") {
            alert("Enter City name");
            return;
        }

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`

            const response = await fetch(url);
            const data = await response.json();

            if(!response.ok) {
                alert(data.message);
                return;
            }

            console.log(data)
            const icon = allIcons[data.weather[0].icon] || clear_icon;
            setweatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon,
            })

        } catch (error) {
            setweatherData(false);
            console.error("Error in fetching data");
        }
    }

    useEffect(() => {
        search("London")
    }, [])

  return (
    <div className='weather'>
        <div className='search-bar'>
            <input ref={inputRef} className='input-bar' type="text" placeholder='Enter your city'/>
            <img onClick={() => search(inputRef.current.value)} className='search-icon' src={search_icon} alt="" />
        </div>
        {weatherData? <>
            <img className='weather-icon' src={weatherData.icon} alt="" />
            <p className='temperature'>{weatherData.temperature}°C</p>
            <p className='location'>{weatherData.location}</p>
            <div className="weather-data">
            <div className="col">
                <img className='humidity' src={humidity_icon} alt="" />
                <div>
                    <p>{weatherData.humidity}%</p>
                    <span>Humidity</span>
                </div>
            </div>
                <div className="col">
                <img className='wind' src={windy_icon} alt="" />
                <div>
                    <p>{weatherData.windSpeed} Km/h</p>
                    <span>Wind Speed</span>
                </div>
            </div>
        </div>
        </> : <></>}

    </div>
  )
}

export default Weather