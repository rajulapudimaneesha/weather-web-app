import React, { useEffect, useState } from 'react';
import { weekdays } from "../config"
import { formatTime } from '../utils';
import ForecastChart from './ForecastChart';

const WeatherDetails = ({weather, forecast}) => {
    const [selectedIndex, setIndex] = useState(0)
    const {dt} = weather
    const dateObj = new Date(dt * 1000)
    const weatherDetail = weather.weather[0]
    return (
        <>
            <div className="weather-wrap">
                <h1 className="city-title">{weather.name}, {weather.sys.country}</h1>
                <p>{weekdays[dateObj.getDay()]} {formatTime(dateObj)}</p>
                <p>{weatherDetail.main}</p>
                <div className="detail-icon-wrap">
                    <img src={`http://openweathermap.org/img/w/${weatherDetail.icon}.png`} /><p>{weather.main.temp} &deg;F</p>
                </div>
                <ForecastChart dt={forecast.daily[selectedIndex].dt} hourly={forecast.hourly} />
                <ul className="days-forecast">
                    {forecast.daily.slice(0, 6).map(({dt, temp, weather}, index) => {
                        const dateObj = new Date(dt * 1000)
                        return (
                            <li key={dt}>
                                <a className={selectedIndex === index?'active':''} onClick={() => setIndex(index)}>
                                    <p>{weekdays[dateObj.getDay()].slice(0, 3)}</p>
                                    <div><img src={`http://openweathermap.org/img/w/${weather[0].icon}.png`} /></div>
                                    <p className="temp-text"><span className="dark">{Math.round(temp.max)}&deg;</span> <span className="light">{Math.round(temp.min)}&deg;</span></p>
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}
export default WeatherDetails
