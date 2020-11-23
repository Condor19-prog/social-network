import React from "react";
import s from './Header.module.css'


function Header(){
    return(
        <div className={s.header}>
            <img src="https://www.tuyid.org/images/clients/logoyazilim.png" alt="logo"/>
        </div>
    )
}
export default Header