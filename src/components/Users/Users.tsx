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
import {useHistory} from "react-router-dom";
import * as queryString from "querystring";

type usersPropsType = {}

type QueryParamsType = {
    term?: string
    page?: string
    friend?: string
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
    const history = useHistory()

    useEffect(() => {
        const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType
        let actualPage = currentPage
        let actualFilter = filter
        if (!!parsed.page) actualPage = +parsed.page
        if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}

        switch (parsed.friend) {
            case 'null': {
                actualFilter = {...actualFilter, friend: null}
                break
            }
            case 'true': {
                actualFilter = {...actualFilter, friend: true}
                break
            }
            case 'false': {
                actualFilter = {...actualFilter, friend: false}
                break
            }
        }

        dispatch(requestUsers(actualPage, pageSize, actualFilter))
    }, [])

    useEffect(() => {
        const query: QueryParamsType = {}
        if(!!filter.term) query.term = filter.term
        if(filter.friend !== null) query.friend = String(filter.friend)
        if(currentPage !== 1) query.page = String(currentPage)

        history.push({
            pathname: '/users',
            // search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
            search: queryString.stringify(query)
        })
    }, [filter, currentPage])

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