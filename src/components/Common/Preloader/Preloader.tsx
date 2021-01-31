import React from "react";
import preloader from "../../../assets/photo/preloader.png";
import s from './preloader.module.css'

const Preloader = () => {
    return (
        <span className={s.preloader}>
            <img src={preloader} alt="fetching"/>
        </span>
    )
}
export default Preloader