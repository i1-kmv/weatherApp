import React from "react"
import {useDispatch, useSelector} from "react-redux"
import { Redirect } from "react-router-dom"
import {setMenuModeAC, setTimeModeAC, setWeatherModeAC} from "../../store/menu-reducer"
import {AppRootStateType} from "../../store/store"
import s from '../Menu/Menu.module.css'
import {MenuButton} from "../../components/MenuButton/MenuButton"

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
           <MenuButton onButtonClickHandler={onTimeButtonClickHandler} title={'Time'}/>
           <MenuButton onButtonClickHandler={onWeatherButtonClickHandler} title={'Weather'}/>
        </div>

    )
}