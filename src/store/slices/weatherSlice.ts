import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {API_URL,API_KEY} from "../../constants";
import {filterWeatherListByDay} from "../../helpers";

interface WeatherState {
    status: "idle" | "pending" | "succeeded" | "failed"
    error : string
    country: string,
    cityName: string,
    weatherList: any[]
    list: any[]
    temp: string
}
interface ArgumentsType {
    type?: string;
    city?: string;
}

const initialState: WeatherState = {
    status: "idle",
    error: "",
    country: "",
    cityName: "",
    weatherList: [],
    list: [],
    temp: "C"
};


export const getWeatherList = createAsyncThunk<any, ArgumentsType, {rejectValue: string}>
('weather/getWeatherList',
    async (data,{rejectWithValue}) => {
        try{
            const response = await axios.get(`${API_URL}/forecast?q=${data.city}&appid=${API_KEY}`)
            // console.log("response get list ::",response.data?.list)
            return response.data
        }catch (err: any) {
            console.log("err get weather list", err)
            return rejectWithValue(err?.message || "Something went wrong !!!");
        }
    }
)

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        changeByTemp: (state:WeatherState, action:PayloadAction<number>) => {
            if(action.payload < 1) {
                state.temp = "C"
                state.weatherList = filterWeatherListByDay(state.list,"C")
            }else{
                state.temp = "F"
                state.weatherList = filterWeatherListByDay(state.list,"F")
            }
        }
    },
    extraReducers: (builder)=> {
        builder
            .addCase(getWeatherList.pending,(state:WeatherState) => {
                state.status = "pending"
            })
            .addCase(getWeatherList.fulfilled,(state:WeatherState, action: PayloadAction<any>) => {
                state.status = "succeeded"
                state.country = action.payload?.city.country
                state.cityName = action.payload?.city.name
                state.list = action.payload.list
                if(action.payload.list.length > 0 ){
                    state.weatherList = filterWeatherListByDay(action.payload?.list, state.temp)
                }
            })

            .addCase(getWeatherList.rejected,(state:WeatherState,action:PayloadAction<any>) => {
                state.status = "failed"
                state.error = action.payload
            })
    }
})

export const {changeByTemp} = weatherSlice.actions
export default weatherSlice.reducer