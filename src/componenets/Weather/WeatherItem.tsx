import React from 'react';
import {WeatherData} from "../../constants";
import "./styles/WeatherList.css"

interface WeatherItemProps {
    item:any,
    handleSelectCard: (item:any) => void,
}

const WeatherItem:React.FC<WeatherItemProps> = ({item,handleSelectCard}) => {
    return (
        <div onClick={() => handleSelectCard(item)} className="card">
            <span className="date_title"> {item.date}</span>
            <div className="card_icon">
                <span>{item.temp}°C</span>
                {WeatherData.map((weatherType, index) => weatherType.type === item?.weather && (
                    <div key={index}>
                        <img src={weatherType.image} width={44} height={44} alt={weatherType.type}/>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeatherItem;