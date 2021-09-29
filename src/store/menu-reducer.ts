
const initialState = {
    timeMode: false,
    weatherMode: false,
    menuMode: false
}

export const menuReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "MENU/SET-TIME-MODE":
            return {...state, timeMode: action.timeMode}
        case "MENU/SET-WEATHER-MODE":
            return {...state, weatherMode: action.weatherMode}
        case "MENU/SET-MENU-MODE":
            return {...state, menuMode: action.menuMode}
        default:
            return {...state}
    }
}

export const setTimeModeAC = (timeMode: boolean) => ({type: "MENU/SET-TIME-MODE", timeMode} as const)
export const setWeatherModeAC = (weatherMode: boolean) => ({type: "MENU/SET-WEATHER-MODE", weatherMode} as const)
export const setMenuModeAC = (menuMode: boolean) => ({type: "MENU/SET-MENU-MODE", menuMode} as const)

type ActionsType = ReturnType<typeof setTimeModeAC> | ReturnType<typeof setWeatherModeAC> | ReturnType<typeof setMenuModeAC>
type InitialStateType = typeof initialState

