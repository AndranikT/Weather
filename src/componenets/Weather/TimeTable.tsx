import React from 'react';
import {WeatherData} from "../../constants";

const TimeTable = ({timeZone}:{timeZone:any}) => {
    return (
        <div className={"list"}>
            {timeZone.length > 0 && timeZone.map((time: any, index: number) =>
                <div key={index} className="list_li">
                    <p> {time[0]}</p>
                    <p> {time[1][0]}°C</p>
                    <p> {time[1][1]}</p>
                    {WeatherData.map((item, index) => item.type === time[1][1] && (
                        <div key={index}>
                            <img src={item.image} width={22} height={22} alt={item.type}/>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TimeTable;