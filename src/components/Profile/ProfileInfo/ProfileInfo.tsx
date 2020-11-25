import React from "react";
import s from './ProfileInfo.module.css'

function ProfileInfo() {
    return (
        <div>
            <div>
                <img src="https://i.ytimg.com/vi/xX5vNmZMLNk/hqdefault.jpg" alt="content"/>
            </div>
            <div className={s.discriptionBlock}>
                ava + description
            </div>
        </div>
    )
}

export default ProfileInfo