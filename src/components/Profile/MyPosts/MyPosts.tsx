import React from "react";
import Post from "./Post/Post";
import s from './Posts.module.css'
import {profilePageType} from "../../../Redux/state";


function MyPosts(props: profilePageType) {

    let postsElements = props.posts.map(p => <Post message={p.message} likeCounts={p.likesCount} key={p.id}/>)

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