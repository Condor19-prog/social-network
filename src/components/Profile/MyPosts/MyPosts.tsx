import React from "react";
import Post from "./Post/Post";
import s from './Posts.module.css'


function MyPosts() {

    return (
        <div className={s.posts}>
            <div>
                <div>
                    <textarea></textarea>
                </div>
                <div>
                    <button>Add post</button>
                </div>
            </div>
            <div className={s.message}>
                <Post message='Hello' likeCounts={15}/>
                <Post message='Когда вернешь долг?' likeCounts={20}/>
            </div>
        </div>
    )
}

export default MyPosts