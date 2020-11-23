import React from "react";
import s from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";


function Profile() {
    return (
        <div>
            <div>
                <img src="https://i.ytimg.com/vi/xX5vNmZMLNk/hqdefault.jpg" alt="content"/>
            </div>
            <div>
                ava + description
            </div>
            <MyPosts/>
        </div>
    )
}

export default Profile