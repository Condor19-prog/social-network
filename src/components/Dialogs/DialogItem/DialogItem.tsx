import React from "react";
import s from './DialogItem.module.css'
import {NavLink} from "react-router-dom";


type dialogsType = {
    id: string
    name: string
}

function DialogItem(props: dialogsType) {
    const path = '/Dialogs/' + props.id

    return (
        <div className={s.dialogItem}>
            <NavLink to={path} >{props.name}</NavLink>
        </div>
    )
}


export default DialogItem