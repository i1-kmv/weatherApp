import React, {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {AppRootStateType} from "../../store/store"
import {setMenuModeAC, setTimeModeAC} from "../../store/menu-reducer"
import {Redirect} from "react-router-dom"
import {setTimeAC} from "../../store/time-reducer"
import s from "../Time/Time.module.css"
import {BackButton} from "../../components/BackButton/BackButton"

export const Time = () => {

    const dispatch = useDispatch()

    const menuMode = useSelector<AppRootStateType, boolean>(state => state.menu.menuMode)
    const time = useSelector<AppRootStateType, string>(state => state.time.time)

    useEffect(() => {

        let timeNow = new Date().toTimeString().replace(/ .*/, '')

        dispatch(setTimeAC(timeNow))

        const intervalId: any = setInterval(() => {
            dispatch(setTimeAC(timeNow))
        }, 1000)

        return () => intervalId

    }, [dispatch])

    const onExitButtonHandler = () => {
        dispatch(setTimeModeAC(false))
        dispatch(setMenuModeAC(true))
    }

    if (menuMode) {
        return <Redirect to={'/'}/>
    }

    return (
        <div className={s.wrap}>
            <div className={s.time}>{time}</div>
            <BackButton onExitButtonHandler={onExitButtonHandler}/>
        </div>
    )
}

