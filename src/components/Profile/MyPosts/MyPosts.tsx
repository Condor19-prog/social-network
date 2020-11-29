import React from "react";
import Post from "./Post/Post";
import s from './Posts.module.css'
import {
    actionsType,
    addPostAC,
    profilePageType,
    updateNewPostAC,
} from "../../../Redux/state";

type myPostsType = {
    profilePageType: profilePageType
    dispatch: (action: actionsType) => void
}


function MyPosts(props: myPostsType) {

    let postsElements = props.profilePageType.posts.map(p => <Post message={p.message} likeCounts={p.likesCount}
                                                                   key={p.id}/>)

    const newPostElement = React.createRef<HTMLTextAreaElement>()

    const addPost = () => {
        if (newPostElement.current) {
            props.dispatch(addPostAC())
        }
    }
    const onPostChange = () => {
        if (newPostElement.current) {
            let text = newPostElement.current.value
            props.dispatch(updateNewPostAC(text))
        }
    }

    return (
        <div className={s.posts}>
            <div>
                <div>
                    <textarea ref={newPostElement}
                              onChange={onPostChange}
                              value={props.profilePageType.newPostText}
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