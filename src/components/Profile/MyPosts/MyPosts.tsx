import React from "react";
import Post from "./Post/Post";
import s from './Posts.module.css'
import {postsType} from "../../../types/types";
import {AddNewPostFormRedux, AddNewPostFormType} from "./AddPostForm/AddPostForm";


export type MapPropsType = {
    posts: Array<postsType>
}
export type DispatchPropsType = {
    addPost: (newPostText: string) => void
}


const MyPosts: React.FC<MapPropsType & DispatchPropsType> = (props) => {

    let postsElements = props.posts.map(p => <Post message={p.message}
                                                   likeCounts={p.likesCount}
                                                   key={p.id}
    />)

    const addPost = (values: AddNewPostFormType) => {
        props.addPost(values.newPostText)
    }

    return (
        <div className={s.posts}>
            <div>
                <AddNewPostFormRedux onSubmit={addPost}/>
            </div>
            <div className={s.message}>
                {postsElements}
            </div>
        </div>
    )
}

export default React.memo(MyPosts)