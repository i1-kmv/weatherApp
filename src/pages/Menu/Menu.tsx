import React from "react"
import {useDispatch, useSelector} from "react-redux";
import { Redirect } from "react-router-dom";
import {setMenuModeAC, setTimeModeAC, setWeatherModeAC} from "../../store/menu-reducer";
import {AppRootStateType} from "../../store/store";
import s from '../Menu/Menu.module.css'


export const Menu = () => {

    const dispatch = useDispatch()

    const timeMode = useSelector<AppRootStateType, boolean>(state => state.menu.timeMode)
    const weatherMode = useSelector<AppRootStateType, boolean>(state => state.menu.weatherMode)

    const onTimeButtonClickHandler = () => {
        dispatch(setMenuModeAC(false))
        dispatch(setTimeModeAC(true))
    }

    const onWeatherButtonClickHandler = () => {
        dispatch(setMenuModeAC(false))
        dispatch(setWeatherModeAC(true))
    }

    if (timeMode) {
        return <Redirect to={'/time'}/>
    }

    if (weatherMode) {
        return <Redirect to={'/weather'}/>
    }

    return (
        <div className={s.menu}>
            <button className={s.btn} onClick={onTimeButtonClickHandler}>Time</button>
            <button className={s.btn} onClick={onWeatherButtonClickHandler}>Weather</button>
        </div>

    )
}