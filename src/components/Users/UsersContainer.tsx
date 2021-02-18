import React, {useEffect} from "react";
import {connect} from "react-redux";
import {RootState} from "../../Redux/redux-store";
import {
    follow,
    setCurrentPage,
    setUsers,
    setUsersTotalCount,
    toggleIsFetching,
    unFollow,
    userType
} from "../../Redux/users-reducer";
import Users from "./Users";
import {usersAPI} from "../../api/api";

type usersAPIComponentPropsType = {
    users: Array<userType>
    unFollow: (userId: string) => void
    follow: (userId: string) => void
    setUsers: (users: Array<userType>) => void
    totalUsersCount: number
    pageSize: number
    currentPage: number
    setCurrentPage: (pageNumber: number) => void
    setUsersTotalCount: (totalCount: number) => void
    toggleIsFetching: (isFetching: boolean) => void
    isFetching: boolean
}

const UsersContainer = (props: usersAPIComponentPropsType) => {
    useEffect(() => {
        props.toggleIsFetching(true)
        usersAPI.getUsers(props.currentPage, props.pageSize)
            .then(data => {
                props.toggleIsFetching(false)
                props.setUsers(data.items)
                props.setUsersTotalCount(data.totalCount)
            })
    }, [])

    const onPageChanged = (pageNumber: number) => {
        props.setCurrentPage(pageNumber)
        props.toggleIsFetching(true)
        usersAPI.getUsers(pageNumber, props.pageSize)
            .then(data => {
                props.toggleIsFetching(false)
                props.setUsers(data.items)
            })
    }

    return (
        <>
            <Users
                users={props.users}
                follow={props.follow}
                unFollow={props.unFollow}
                setUsers={props.setUsers}
                setCurrentPage={props.setCurrentPage}
                currentPage={props.currentPage}
                pageSize={props.pageSize}
                totalUsersCount={props.totalUsersCount}
                onPageChanged={onPageChanged}
                isFetching={props.isFetching}
            />
        </>
    )
}

const mapStateToProps = (state: RootState) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching
    }
}
// const mapDispatchToProps = (dispatch: Dispatch<actionsType>) => {
//     return {
//         follow: (userId: string) => {
//             dispatch(followAC(userId))
//         },
//         unFollow: (userId: string) => {
//             dispatch(unFollowAC(userId))
//         },
//         setUsers: (users: Array<userType>) => {
//             dispatch(setUsersAC(users))
//         },
//         setCurrentPage: (pageNumber: number) => {
//             dispatch(setCurrentPageAC(pageNumber))
//         },
//         setUsersTotalCount: (totalCount: number) => {
//             dispatch(setUsersTotalCountAC(totalCount))
//         },
//         toggleIsFetching: (isFetching: boolean) => {
//             dispatch(toggleIsFetchingAC(isFetching))
//         }
//     }
// }

export default connect(mapStateToProps, {
        follow, unFollow, setUsers,
        setCurrentPage, setUsersTotalCount, toggleIsFetching
    }
)(UsersContainer)
