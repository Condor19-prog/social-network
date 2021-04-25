import React, {useEffect} from "react";
import Preloader from "../Common/Preloader/Preloader";
import Paginator from "../Common/Paginator/Paginator";
import User from "./User";
import s from './users.module.css'
import {FilterType, follow, requestUsers, unFollow} from "../../Redux/users-reducer";
import UsersSearchForm from "./UsersSearchForm";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from "../../Redux/users-selector";

type usersPropsType = {

}

const Users: React.FC<usersPropsType> = () => {
    const dispatch = useDispatch()
    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)
    const isFetching = useSelector(getIsFetching)

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    }, [])

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }
    const followFlow = (userId: number) => {
        dispatch(follow(userId))
    }
    const unFollowFlow = (userId: number) => {
        dispatch(unFollow(userId))
    }

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
                                     follow={followFlow}
                                     unFollow={unFollowFlow}/>
                )
            }
        </div>
    )
}
export default Users