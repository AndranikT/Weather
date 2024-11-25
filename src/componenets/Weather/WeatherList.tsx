import React, {useEffect, useState} from 'react';
import {useAppSelector} from "../../hooks";
import "./styles/WeatherList.css"
import CurrentWeatherBoard from "./CurrentWeatherBoard";
import WeatherItem from "./WeatherItem";
import TimeTable from "./TimeTable";

const WeatherList = () => {

    const [selectedDate, setSelectedDate] = useState<any>({});
    const [timeZone, setTimeZone] = useState<any>({});


    const { weatherList, status, error } = useAppSelector(state => state.weather)

    useEffect(() => {
        setSelectedDate(weatherList[0])
        if(weatherList[0]?.timeZones){
            setTimeZone(Object.entries(weatherList[0]?.timeZones))
            // console.log("weather list",weatherList);
        }
    },[weatherList])

    const handleSelectCard = (selected:any) => {
        setSelectedDate(selected)
        setTimeZone(Object.entries(selected?.timeZones))
    }

    return (
        <div>
            {status === 'pending' ? (
                <span>Loading ... </span>
            ): status === 'failed' ? (
                <span> Error - {error} </span>
            ): (
                <div className="con_">
                    <div className="first_con">
                        <CurrentWeatherBoard selectedDate={selectedDate}/>
                        <TimeTable timeZone={timeZone}/>
                    </div>
                    <div className="second_con">
                        {weatherList.map((item) => (
                            <WeatherItem
                                key={item.id}
                                item={item}
                                handleSelectCard={handleSelectCard}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default WeatherList;