import React from "react"
import s from "../MenuButton/MenuButton.module.css"

export const MenuButton = (props:MenuButtonPropsType) => {
    return (
        <button className={s.btn} onClick={props.onButtonClickHandler}>{props.title}</button>
    )
}

type MenuButtonPropsType = {
    onButtonClickHandler: () => void
    title:string
}