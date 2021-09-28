import React from "react"
import {setMenuModeAC, setWeatherModeAC} from "../store/menu-reducer"
import {useDispatch, useSelector} from "react-redux"
import {AppRootStateType} from "../store/store"
import {Redirect} from "react-router-dom"
import {useFormik} from "formik"
import {setDataTC} from "../store/weather-reducer"



export const Weather = () => {

    const formik = useFormik({
        initialValues: {
            city: '',
        },
        validate: (values) => {
            const errors: any = {};
            if (!values.city) {
                errors.city = 'Required';
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(setDataTC(values.city))
        },
    })

    const dispatch = useDispatch()

    const menuMode = useSelector<AppRootStateType, boolean>(state => state.menu.menuMode)
    const city = useSelector<AppRootStateType, string>(state => state.weather.city)
    const weatherSrc = useSelector<AppRootStateType, string>(state => state.weather.weatherSrc)
    const weather = useSelector<AppRootStateType, string>(state => state.weather.weather)
    const weatherDescription = useSelector<AppRootStateType, string>(state => state.weather.description)
    const dataLoading = useSelector<AppRootStateType, boolean>(state => state.weather.dataLoading)


    const onExitButtonHandler = () => {
        dispatch(setWeatherModeAC(false))
        dispatch(setMenuModeAC(true))
    }

    const source = `https://openweathermap.org/img/wn/${weatherSrc}.png`
    const weatherInCels = weather ? Math.round(+weather / 37).toString() : ''

    if (menuMode) {
        return <Redirect to={'/'}/>
    }
    return (
        <div>
            <div onClick={onExitButtonHandler}>Выйти в главное меню</div>
            <form onSubmit={formik.handleSubmit}>
                <input
                    type="text"
                    {...formik.getFieldProps('city')}
                />
                {formik.errors.city ? <div>{formik.errors.city}</div> : null}
                <button>узнать погоду</button>
            </form>
            {dataLoading ?
                <div>Loading</div>
            :  <div>
                    City: {city}
                    <img src={source} alt=""/>
                    weather: {weatherInCels} <sup>O</sup>C
                    description: {weatherDescription}
                </div>}

        </div>
    )
}


