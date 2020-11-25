import React from "react";
import s from './../Dialogs.module.css'
import {NavLink} from "react-router-dom";


type dialogsType = {
    id: number
    name: string
}

function DialogItem(props: dialogsType) {
    const path = '/Dialogs/' + props.id

    return (
        <div className={s.dialog}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}


export default DialogItem