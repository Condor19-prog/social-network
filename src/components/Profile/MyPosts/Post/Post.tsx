import React from "react";
import s from './Post.module.css'

type PostType = {
    message: string
    likeCounts: number
}

function Post(props: PostType) {

    return (
        <div className={s.item}>
            <img src="https://a.d-cd.net/jgAAAgJusuA-200.jpg" alt='logo'/>
            {props.message}
            <div>
                <span>like: {props.likeCounts}</span>
            </div>
        </div>
    )
}


export default Post