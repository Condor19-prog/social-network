import React from "react";
import Post from "./Post/Post";
import s from './Posts.module.css'
import {postsType} from "../../../Redux/redux-store";
import {Field, InjectedFormProps, reduxForm} from "redux-form";


type myPostsType = {
    posts: Array<postsType>
    addPost: (values: string) => void
}


function MyPosts(props: myPostsType) {

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

type AddNewPostFormType = {
    newPostText: string
}
const AddNewPostForm: React.FC<InjectedFormProps<AddNewPostFormType>> = (props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <Field name='newPostText' component='textarea'/>
                <div>
                    <button>Add post</button>
                </div>
            </form>

        </div>
    )
}
const AddNewPostFormRedux = reduxForm<AddNewPostFormType>({form: 'AddNewPostForm'})(AddNewPostForm)

export default MyPosts