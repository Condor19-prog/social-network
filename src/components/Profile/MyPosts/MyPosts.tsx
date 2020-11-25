import React from "react";
import Post from "./Post/Post";
import s from './Posts.module.css'


function MyPosts() {

    const postData = [
        {id: 1, message: 'Bonjour', likesCount: 12},
        {id: 2, message: 'Когда вернешь долг?', likesCount: 100000}
    ]

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
                <Post message={postData[0].message} likeCounts={postData[0].likesCount}/>
                <Post message={postData[1].message} likeCounts={postData[1].likesCount}/>
            </div>
        </div>
    )
}

export default MyPosts