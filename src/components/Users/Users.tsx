import React from "react";
import s from "./users.module.css";
import {unFollowTC, userType} from "../../Redux/users-reducer";
import userPhoto from "../../assets/photo/user-male.png";
import Preloader from "../Common/Preloader/Preloader";
import {NavLink} from "react-router-dom";

type usersPropsType = {
    users: Array<userType>
    unFollowTC: (userId: number) => void
    followTC: (userId: number) => void
    pageSize: number
    totalUsersCount: number
    currentPage: number
    setCurrentPage: (pageNumber: number) => void
    onPageChanged: (pageNumber: number) => void
    isFetching: boolean
    followingIsProgress: any
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
                            ? <button disabled={props.followingIsProgress.some((id: number) => id === u.id)}
                                      onClick={() => props.unFollowTC(u.id)}>Unfollow</button>
                            : <button disabled={props.followingIsProgress.some((id: number) => id === u.id)}
                                      onClick={() => props.followTC(u.id)}>Follow</button>
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