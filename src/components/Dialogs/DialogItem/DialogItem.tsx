import React from "react";
import s from './../Dialogs.module.css'
import {NavLink} from "react-router-dom";

type DialogItemsType = {
    id: number
    name: string
}

function DialogItem(props: DialogItemsType) {
    const path = '/Dialogs/' + props.id

    return (
        <div className={s.dialog}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}


export default DialogItem