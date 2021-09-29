import {Dispatch} from "redux"
import {weatherApi} from "../api/weather-api"

const initialState = {
    city: '',
    weather: '',
    description: '',
    weatherSrc: '',
    dataLoading: false,
    error: false
}

export const weatherReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "WEATHER/SET-CITY":
            return {...state, city: action.city}
        case "WEATHER/SET-WEATHER":
            return {...state, weather: action.weather}
        case "WEATHER/SET-WEATHER-SRC":
            return {...state, weatherSrc: action.weatherSrc}
        case "WEATHER/SET-WEATHER-DESCRIPTION":
            return {...state, description: action.description}
        case "WEATHER/DATA-LOADING":
            return {...state, dataLoading: action.dataLoading}
        case "WEATHER/SET-ERROR":
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setCityAC = (city: string) => ({type: "WEATHER/SET-CITY", city} as const)
export const setWeatherAC = (weather: string) => ({type: "WEATHER/SET-WEATHER", weather} as const)
export const setWeatherSrcAC = (weatherSrc: string) => ({type: "WEATHER/SET-WEATHER-SRC", weatherSrc} as const)
export const setWeatherDescriptionAC = (description: string) => ({type: "WEATHER/SET-WEATHER-DESCRIPTION", description} as const)
export const setDataLoadingAC = (dataLoading: boolean) => ({type: "WEATHER/DATA-LOADING", dataLoading} as const)
export const setErrorAC = (error: boolean) => ({type: "WEATHER/SET-ERROR", error} as const)

export const setDataTC = (data:string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setDataLoadingAC(true))

        const res = await weatherApi.getCityWeather(data)

        dispatch(setCityAC(res.data.name))
        dispatch(setWeatherSrcAC(res.data.weather[0].icon))
        dispatch(setWeatherDescriptionAC(res.data.weather[0].description))
        dispatch(setWeatherAC(res.data.main.temp))
        dispatch(setDataLoadingAC(false))
    } catch (err) {
        setCityAC('')
        dispatch(setDataLoadingAC(false))
        dispatch(setErrorAC(true))
    }
}

type ActionsType = ReturnType<typeof setCityAC>
    | ReturnType<typeof setWeatherAC>
    | ReturnType<typeof setWeatherSrcAC>
    | ReturnType<typeof setWeatherDescriptionAC>
    | ReturnType<typeof setDataLoadingAC>
    | ReturnType<typeof setErrorAC>

type InitialStateType = typeof initialState