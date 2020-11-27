import React from "react";
import Post from "./Post/Post";
import s from './Posts.module.css'
import {profilePageType} from "../../../Redux/state";

type myPostsType = {
    posts: profilePageType
    addPost: () => void
    updateNewPostText: (newText: string) => void
    newPostText: string
}


function MyPosts(props: myPostsType) {

    let postsElements = props.posts.posts.map(p => <Post message={p.message} likeCounts={p.likesCount} key={p.id}/>)

    const newPostElement = React.createRef<HTMLTextAreaElement>()

    const addPost = () => {
        if (newPostElement.current) {
            props.addPost()
        }
    }
    const onPostChange = () => {
        if (newPostElement.current) {
            let text = newPostElement.current.value
            props.updateNewPostText(text)
        }
    }

    return (
        <div className={s.posts}>
            <div>
                <div>
                    <textarea ref={newPostElement}
                              onChange={onPostChange}
                              value={props.newPostText}
                    />
                </div>
                <div>
                    <button onClick={addPost}>Add post</button>
                </div>
            </div>
            <div className={s.message}>
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts