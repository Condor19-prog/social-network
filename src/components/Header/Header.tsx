import React from "react";
import s from './Header.module.css'
import {NavLink} from "react-router-dom";

export type MapPropsType = {
    isAuth: boolean
    login: string | null
}
export type DispatchPropsType = {
    logOut: () => void
}

const Header: React.FC<MapPropsType & DispatchPropsType> = (props) => {

    const logOut = () => {
        props.logOut()
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
};

export default Header