import React from "react";
import Post from "./Post/Post";
import s from './Posts.module.css'


function MyPosts() {

    const postData = [
        {id: 1, message: 'Bonjour', likesCount: 12},
        {id: 2, message: 'Когда вернешь долг?', likesCount: 100000}
    ]
    let postsElements = postData.map(p => <Post message={p.message} likeCounts={p.likesCount}/>)

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
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts