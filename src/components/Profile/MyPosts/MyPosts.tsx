import React from "react";
import Post from "./Post/Post";
import s from './Posts.module.css'


function MyPosts() {

    return (
        <div>
            <div>
                <textarea></textarea>
                <button>Add post</button>
            </div>
            <div className={s.posts}>
                <Post message='Hello' likeCounts={15}/>
                <Post message='Когда вернешь долг?' likeCounts={20}/>
            </div>
        </div>
    )
}

export default MyPosts