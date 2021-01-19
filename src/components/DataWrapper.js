import React from 'react';
import { useEffect, useState } from "react"
import { APP_ID } from "../config"
import WeatherDetails from "./WeatherDetails"

const DataWrapper = ({lat, long}) => {
    const [weatherData, setWeatherData] = useState(null)
    const [forecastData, setForecastData] = useState(null)
    const [isFetching, setFetching] = useState(false)
    useEffect(() => {
        setFetching(true)
        Promise.all([fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${APP_ID}&units=imperial`),
        fetch(`http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${APP_ID}&units=imperial`) 
        ]).then(responses => Promise.all(responses.map((res) => res.json()))).then((data) => {
            setWeatherData(data[0])
            const {daily, hourly} = data[1]
            setForecastData({daily, hourly})
            setFetching(false)
        })

        // setData({"coord":{"lon":77.626,"lat":12.9113},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"base":"stations","main":{"temp":291.32,"feels_like":291.92,"temp_min":290.15,"temp_max":292.15,"pressure":1016,"humidity":88},"visibility":6000,"wind":{"speed":2.06,"deg":90},"clouds":{"all":0},"dt":1610995385,"sys":{"type":1,"id":9205,"country":"IN","sunrise":1611018950,"sunset":1611060248},"timezone":19800,"id":1277333,"name":"Bengaluru","cod":200})

    }, [lat, long])
    return (
        <div>
            {isFetching?
                <p>Fetching weather data...</p>
                :
                weatherData?<WeatherDetails weather={weatherData} forecast={forecastData} />:null
            }
        </div>
    )
}
export default DataWrapper
