import React from 'react';
import {useAppDispatch} from "../../hooks";
import {getWeatherList} from "../../store/slices/weatherSlice";
import WeatherList from "./WeatherList";

const Weather = () => {
    const dispatch  = useAppDispatch()

    React.useEffect(() => {
        dispatch(getWeatherList({city:"Yerevan"}))
    },[dispatch])

    return (
        <div style={{padding:10,display:"flex",flexDirection:"column", alignItems:"center",justifyContent:"center" }}>
            <WeatherList/>
        </div>
    );
};

export default Weather;