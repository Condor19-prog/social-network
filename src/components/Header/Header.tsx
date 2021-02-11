import React from "react";
import s from './Header.module.css'
import {NavLink} from "react-router-dom";

type headerPropsType = {
    isAuth: boolean
    login: number
}

function Header(props: any) {
    return (
        <header className={s.header}>
                <img src="https://www.tuyid.org/images/clients/logoyazilim.png" alt="logo"/>
            <div className={s.loginBlock}>
                {
                    props.isAuth ?
                    props.login :
                    <NavLink to={'/login'}>Login</NavLink>
                }
            </div>
        </header>
    )
}

export default Header