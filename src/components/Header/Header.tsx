import React from "react";
import s from './Header.module.css'
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logOutTC} from "../../Redux/auth-reducer";

type headerPropsType = {
    isAuth: boolean
    login: string | null
}

function Header(props: headerPropsType) {

    const dispatch = useDispatch()

    const logOut = () => {
        dispatch(logOutTC())
    }
    return (
        <header className={s.header}>
            <img src="https://www.tuyid.org/images/clients/logoyazilim.png" alt="logo"/>
            <div className={s.loginBlock}>
                {
                    props.isAuth ?
                        <div>{props.login} - <button onClick={logOut}>Log Out</button></div> :
                        <NavLink to={'/Login'}>Login</NavLink>
                }
            </div>
        </header>
    )
}

export default Header