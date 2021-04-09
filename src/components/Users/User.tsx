import React from "react";
import s from "./users.module.css";
import userPhoto from "../../assets/photo/user-male.png";
import {NavLink} from "react-router-dom";
import {userType} from "../../types/types";

type usersPropsType = {
    user: userType
    unFollowTC: (userId: number) => void
    followTC: (userId: number) => void
    followingInProgress: number[]
}

const Users: React.FC<usersPropsType> = ({user, followingInProgress, unFollowTC, followTC}) => {

    return (
        <div>
                <span>
                    <div>
                        <NavLink to={`/Profile/${user.id}`}>
                        <img src={user.photos.small !== null ? user.photos.small : userPhoto} className={s.userPhoto}
                             alt={'small'}/>
                             </NavLink>
                    </div>
                    <div>
                        {user.followed
                            ? <button disabled={followingInProgress.some((id: number) => id === user.id)}
                                      onClick={() => unFollowTC(user.id)}>Unfollow</button>
                            : <button disabled={followingInProgress.some((id: number) => id === user.id)}
                                      onClick={() => followTC(user.id)}>Follow</button>
                        }
                    </div>
                </span>
            <span>
                        <span>
                            <div>{user.name}</div>
                            <div>{user.status}</div>
                        </span>
                    <span>
                        <div>

                        </div>
                    </span>
            </span>
        </div>
    )
}
export default Users