import React from 'react';
import {useAppSelector} from "../../hooks";
import "./styles/CurrentWeatherBoard.css"
import {WeatherData} from "../../constants";


const CurrentWeatherBoard = ({selectedDate}:{selectedDate: any}) => {
    const {cityName, country, weatherList} = useAppSelector(state => state.weather)

    return (
        <div className="board-container">
            <span> {cityName} {country} </span>
            <span> {selectedDate?.temp}°C</span>
            {WeatherData.map((item, index) => item.type === selectedDate?.weather && (
                <div key={index}>
                    <img src={item.image} width={100} height={100} alt={item.type}/>
                </div>
            ))}
            <span> {selectedDate?.weather}</span>
        </div>
    );
};

export default CurrentWeatherBoard;