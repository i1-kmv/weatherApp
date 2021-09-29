import s from "../BackButton/BackButton.module.css"
import left from "../../img/left.svg"
import React from "react"


export const BackButton = (props: BackButtonPropsType) => {
    return (
        <button className={s.back} onClick={props.onExitButtonHandler}>
            <img src={left} alt=""/>
            main menu
        </button>
    )
}

type BackButtonPropsType = {
    onExitButtonHandler: () => void
}