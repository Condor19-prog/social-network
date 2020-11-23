import React from "react";
import s from './Navbar.module.css'
import {NavLink} from "react-router-dom";


function Navbar() {
    return (
        <div className={s.nav}>
            <div className={s.item}>
                <div>
                    <NavLink to='/profile' activeClassName={s.activeLink}>
                        Profile
                    </NavLink>
                </div>
                <div>
                    <NavLink to='messages' activeClassName={s.activeLink}>
                        Messages
                    </NavLink>
                </div>
                <div>
                    News
                </div>
                <div>
                    Music
                </div>
                <div>
                    Settings
                </div>
            </div>
        </div>
    )
}

export default Navbar