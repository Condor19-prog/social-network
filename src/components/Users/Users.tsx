import React from "react";
import s from "./users.module.css";
import {userType} from "../../Redux/users-reducer";
import userPhoto from "../../assets/photo/user-male.png";
import Preloader from "../Common/Preloader/Preloader";
import {NavLink} from "react-router-dom";
import axios from "axios";

type usersPropsType = {
    users: Array<userType>
    unFollow: (userId: string) => void
    follow: (userId: string) => void
    setUsers: (users: Array<userType>) => void
    pageSize: number
    totalUsersCount: number
    currentPage: number
    setCurrentPage: (pageNumber: number) => void
    onPageChanged: (pageNumber: number) => void
    isFetching: boolean
}

const Users = (props: usersPropsType) => {

    let pageCount = Math.ceil(props.totalUsersCount / props.pageSize)
    const pages = []
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }


    return (
        <div>
            <div className={s.page}>
                {pages.map((p, i) => {
                    return <span key={i} className={props.currentPage === p ? s.selectedPages : ''}
                                 onClick={() => props.onPageChanged(p)}>{p}</span>
                })}
            </div>
            {props.isFetching ? <Preloader/> : null}
            {
                props.users.map((u: userType) => <div className={s.users} key={u.id}>
                <span>
                    <div>
                        <NavLink to={`/Profile/${u.id}`}>
                        <img src={u.photos.small !== null ? u.photos.small : userPhoto} className={s.userPhoto}
                             alt={'small'}/>
                             </NavLink>
                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => {
                                axios.delete(`https://social-network.samuraijs.com/api/1.0//follow/${u.id}`, {
                                    withCredentials: true,
                                    headers: {
                                        'API-KEY': 'c9904dcf-3bb3-447f-a0b3-278ebd3674e9'
                                    }
                                })
                                    .then(response => {
                                        if (response.data.resultCode === 0) {
                                            props.unFollow(u.id)
                                        }
                                    })
                            }}>Unfollow</button>
                            : <button onClick={() => {
                                axios.post(`https://social-network.samuraijs.com/api/1.0//follow/${u.id}`, {}, {
                                    withCredentials: true,
                                    headers: {
                                        'API-KEY': 'c9904dcf-3bb3-447f-a0b3-278ebd3674e9'
                                    }
                                })
                                    .then(response => {
                                            if (response.data.resultCode === 0) {
                                                props.follow(u.id)
                                            }
                                        }
                                    )

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