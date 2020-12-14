import React, {ChangeEvent} from "react";
import Post from "./Post/Post";
import s from './Posts.module.css'
import {postsType} from "../../../Redux/redux-store";


type myPostsType = {
    posts: Array<postsType>
    addPost: () => void
    updateNewPostText: (text: string) => void
    newPostText: string
}


function MyPosts(props: myPostsType) {

    let postsElements = props.posts.map(p => <Post message={p.message}
                                                   likeCounts={p.likesCount}
                                                   key={p.id}
    />)

    const newPostElement = React.createRef<HTMLTextAreaElement>()

    const addPost = () => {
        if (newPostElement.current) {
            props.addPost()
        }
    }
    const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (e.currentTarget.value) {
            let text = e.currentTarget.value
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