import React from "react";
import s from './users.module.css'
import {userType} from "../../Redux/users-reducer";
import axios from 'axios';
import userPhoto from '../../assets/photo/user-male.png'

type usersPropsType = {
    users: Array<userType>
    unFollow: (userId: string) => void
    follow: (userId: string) => void
    setUsers: (users: Array<userType>) => void
}


const Users = (props: usersPropsType) => {
    if (props.users.length === 0) {
        axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
                props.setUsers(response.data.items)
            }
        )
    }
    return (
        <div>
            {
                props.users.map((u: userType) => <div key={u.id}>
                <span>
                    <div>
                        <img src={u.photos.small !== null ? u.photos.small : userPhoto} className={s.userPhoto}
                             alt={'small'}/>
                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => {
                                props.unFollow(u.id)
                            }}>Unfollow</button>
                            : <button onClick={() => {
                                props.follow(u.id)
                            }}>Follow</button>
                        }
                    </div>
                </span>
                        <span>
                        <span>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                         </span>
                    <span>
                        <div>

                        </div>
                    </span>
                </span>
                    </div>
                )
            }
        </div>
    )
}

export default Users