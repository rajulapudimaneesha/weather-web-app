import React from 'react';
import { useEffect, useState } from "react"
import DataWrapper from "./DataWrapper"

const GEO_SUPPORTED = 'supported'
const GEO_UNSUPPORTED = 'unsupported'
const GEO_REJECTED = 'rejected'



const WeatherApp = () => {
    const [coordinates, setCoordinates] = useState([])
    const [geolocationStatus, setGeoStatus] = useState(null)
    const getGeoLocation = () => {
        navigator.geolocation.getCurrentPosition(({coords}) => {
            setGeoStatus(null)
            setCoordinates([coords.latitude, coords.longitude])
        }, () => setGeoStatus(GEO_REJECTED));
    }
    useEffect(() => {
        if(navigator && navigator.geolocation) {
            setGeoStatus(GEO_SUPPORTED)
            getGeoLocation()
        } else {
            setGeoStatus(GEO_UNSUPPORTED)
        }
    }, [])
    
    let content = null
    switch(geolocationStatus) {
        case GEO_SUPPORTED:
            content = <p>Fetching location...</p>
            break;
        case GEO_UNSUPPORTED:
            content = <p>Geolocation is not supported by your browser</p>
            break;
        case GEO_REJECTED:
            content = <p>Location request has been rejected. Please allow from browser settings and then click <button onClick={() => getGeoLocation()}>here</button> to get weather data</p>
            break;
        default:
            if(coordinates.length) {
                content = <DataWrapper lat={coordinates[0]} long={coordinates[1]} />
            }
    }
    return (
        <div>
            {content}
        </div>
    )
}
export default WeatherApp
