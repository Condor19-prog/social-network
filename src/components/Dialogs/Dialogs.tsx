import React from "react";
import s from './Dialogs.module.css'
import {NavLink} from "react-router-dom";


function Dialogs() {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <div className={s.dialog}>
                    <NavLink to='Dialogs/1'>Dimych</NavLink>
                </div>
                <div className={s.dialog}>
                    <NavLink to='Dialogs/2'>Sveta</NavLink>
                </div>
            </div>
            <div className={s.messages}>
                <div className={s.message}>Yo</div>
                <div className={s.message}>Hello</div>
            </div>
        </div>
    )
}

export default Dialogs