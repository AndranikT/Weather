import {CELSIUS,FAHRENHEIT} from "../constants";

export function filterWeatherListByDay (list: any[], temp:string) {
    const filteredByDays:any = []
    list?.reduce((acc, elem) => {
        const currentDate = elem.dt_txt;
        const currentDay = currentDate.substring(5,11)
        const currentTime = currentDate.substring(11)
        if(!filteredByDays[currentDay]){
            filteredByDays[currentDay] = {}
        }
        filteredByDays[currentDay][currentTime] = [elem.main.temp, elem.weather[0].main]
        filteredByDays[currentDay].id = elem.dt
        filteredByDays[currentDay].date = currentDay
        filteredByDays[currentDay].temp = elem.main.temp
        filteredByDays[currentDay].weather = elem.weather[0].main
        filteredByDays[currentDay].descWeather = elem.weather[0].description
    })
    // console.log("filtered By Days", filteredByDays)

    return handleFilteredByDays(filteredByDays, temp);
}

function handleFilteredByDays(list: any[], temp:string) {
    const filterData = []
    for ( const day in list ){
        let tempObj : any = {}
        tempObj.timeZones = {}

        for(const time in list[day]){
            tempObj.id = list[day].id
            tempObj.date = list[day].date
            tempObj.temp = temp === "C" ? computeWeather(CELSIUS, list[day].temp) : computeWeather(FAHRENHEIT, list[day].temp)
            // computeWeather(CELSIUS, list[day].temp)
            // tempObj.tempF = computeWeather(FAHRENHEIT, list[day].temp)
            tempObj.weather = list[day].weather
            tempObj.descWeather = list[day].descWeather

            if( time !== "id" && time !== "weather" && time !== "temp" && time !== "descWeather" && time !== "date"){
                tempObj.timeZones[time]= [
                    // computeWeather(CELSIUS, list[day][time][0]),
                    temp === "C" ? computeWeather(CELSIUS, list[day][time][0]) : computeWeather(FAHRENHEIT, list[day][time][0]),
                    list[day][time][1]
                ]
            }
        }
        filterData.push(tempObj)
    }
    // console.log("***", filterData)
    return filterData
}

export function computeWeather (type: string, temp: number) {
    switch (type) {
        case CELSIUS:
            return Math.floor((temp - 273.15));
        case FAHRENHEIT:
            return Math.floor(((temp - 273.15) * 9) / 5 + 32);
    }
}