import React from "react";
import Preloader from "../Common/Preloader/Preloader";
import {UserType} from "../../types/types";
import Paginator from "../Common/Paginator/Paginator";
import User from "./User";
import s from './users.module.css'
import {FilterType} from "../../Redux/users-reducer";
import UsersSearchForm from "./UsersSearchForm";

type usersPropsType = {
    users: Array<UserType>
    isFetching: boolean
    followingInProgress: number[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    onFilterChanged: (filter: FilterType) => void
}

const Users: React.FC<usersPropsType> = ({
                                             users, isFetching, followingInProgress, pageSize,
                                             totalUsersCount, currentPage, onPageChanged, follow, unFollow,onFilterChanged
                                         }) => {

    return (
        <div className={s.users}>
            <UsersSearchForm onFilterChanged={onFilterChanged}/>
            <Paginator pageSize={pageSize} totalItemCount={totalUsersCount} currentPage={currentPage}
                       onPageChanged={onPageChanged}
            />
            {isFetching ? <Preloader/> : null}
            {
                users.map(u => <User key={u.id}
                                     user={u}
                                     followingInProgress={followingInProgress}
                                     follow={follow}
                                     unFollow={unFollow}/>
                )
            }
        </div>
    )
}
export default Users