import {applyMiddleware, combineReducers, createStore} from "redux"
import thunkMiddleware from 'redux-thunk'
import {menuReducer} from "./menu-reducer"
import {weatherReducer} from "./weather-reducer"
import {timeReducer} from "./time-reducer"

const rootReducer = combineReducers({
    menu: menuReducer,
    weather: weatherReducer,
    time: timeReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof rootReducer>
