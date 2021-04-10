import React from "react";
import Preloader from "../Common/Preloader/Preloader";
import {userType} from "../../types/types";
import Paginator from "../Common/Paginator/Paginator";
import User from "./User";
import s from './users.module.css'

type usersPropsType = {
    users: Array<userType>
    isFetching: boolean
    followingInProgress: number[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    followTC: (userId: number) => void
    unFollowTC: (userId: number) => void
}

const Users: React.FC<usersPropsType> = ({
                                             users, isFetching, followingInProgress, pageSize,
                                             totalUsersCount, currentPage, onPageChanged, followTC, unFollowTC
                                         }) => {

    return (
        <div className={s.users}>
            <Paginator pageSize={pageSize} totalItemCount={totalUsersCount} currentPage={currentPage}
                       onPageChanged={onPageChanged} isFetching={isFetching}
            />
            {isFetching ? <Preloader/> : null}
            {
                users.map(u => <User key={u.id}
                                     user={u}
                                     followingInProgress={followingInProgress}
                                     followTC={followTC}
                                     unFollowTC={unFollowTC}/>
                )
            }
        </div>
    )
}
export default Users