import React from "react"
import {setMenuModeAC, setWeatherModeAC} from "../../store/menu-reducer"
import {useDispatch, useSelector} from "react-redux"
import {AppRootStateType} from "../../store/store"
import {Redirect} from "react-router-dom"
import {useFormik} from "formik"
import {setCityAC, setDataTC, setErrorAC} from "../../store/weather-reducer"
import s from '../Weather/Weather.module.css'
import left from '../../img/left.svg'
import {BackButton} from "../../components/BackButton/BackButton";

export const Weather = () => {

    const formik = useFormik({
        initialValues: {
            city: '',
        },

        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.city) {
                errors.city = 'Required';
            }
            return errors;
        },

        onSubmit: values => {
            dispatch(setDataTC(values.city.trim()))
            dispatch(setErrorAC(false))
            dispatch(setCityAC(''))
            values.city = ''
        },
    })

    const dispatch = useDispatch()

    const menuMode = useSelector<AppRootStateType, boolean>(state => state.menu.menuMode)
    const city = useSelector<AppRootStateType, string>(state => state.weather.city)
    const weatherSrc = useSelector<AppRootStateType, string>(state => state.weather.weatherSrc)
    const weather = useSelector<AppRootStateType, string>(state => state.weather.weather)
    const weatherDescription = useSelector<AppRootStateType, string>(state => state.weather.description)
    const dataLoading = useSelector<AppRootStateType, boolean>(state => state.weather.dataLoading)
    const error = useSelector<AppRootStateType, boolean>(state => state.weather.error)

    const onExitButtonHandler = () => {
        dispatch(setWeatherModeAC(false))
        dispatch(setMenuModeAC(true))
        dispatch(setCityAC(''))
        dispatch(setErrorAC(false))
    }

    const source = `https://openweathermap.org/img/wn/${weatherSrc}.png`
    const weatherInCels = weather ? Math.round(+weather - 273).toString() : ''

    if (menuMode) {
        return <Redirect to={'/'}/>
    }
    return (
        <div className={s.weather}>
            <form className={s.form} onSubmit={formik.handleSubmit}>
                {formik.errors.city ? <div>{formik.errors.city}</div> : null}
                <input
                    className={s.input}
                    type="text"
                    {...formik.getFieldProps('city')}
                />
                <button className={s.form_button} disabled={dataLoading}>request the weather</button>
            </form>
            {dataLoading ?
                <div>Loading</div>
            :  city &&
                <div className={s.data}>
                    <div>City: <b>{city}</b></div>
                    <div>
                        weather: <b>{weatherInCels} <sup>O</sup>C</b>
                    </div>
                    <div className={s.description}>
                        <span>description: <b>{weatherDescription}</b></span>
                        <img className={s.description_image} src={source} alt="weather image"/>
                    </div>
                </div>
            }
            {error && <div className={s.error_message}>
                An error occurred when requesting. Please check if the city name is correct and try again.
            </div>}
            <BackButton onExitButtonHandler={onExitButtonHandler}/>
        </div>
    )
}

export type FormikErrorType = {
    city?: string | null
}
