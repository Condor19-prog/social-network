import React, {useEffect} from "react";
import {connect, useDispatch} from "react-redux";
import {RootStateType} from "../../Redux/redux-store";
import {FilterType, follow, requestUsers, unFollow,} from "../../Redux/users-reducer";
import Users from "./Users";
import {compose} from "redux";
import {UserType} from "../../types/types";
import {
    followingInProgress,
    getCurrentPage,
    getIsFetching,
    getPageSize,
    getTotalUsersCount, getUsers, getUsersFilter,
} from "../../Redux/users-selector";

type mapStateToPropsType = {
    users: Array<UserType>
    totalUsersCount: number
    pageSize: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
    filter: FilterType
}
type mapDispatchToPropsType = {
    unFollow: (userId: number) => void
    follow: (userId: number) => void
    requestUsers: (page: number, pageSize: number, filter: FilterType) => void
}
type ownPropsType = {
    //свои пропсы какие то
}
type usersAPIComponentPropsType = mapStateToPropsType & mapDispatchToPropsType & ownPropsType


const UsersContainer = (props: usersAPIComponentPropsType) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(requestUsers(props.currentPage, props.pageSize, props.filter))
    }, [props.currentPage, props.pageSize])

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, props.pageSize, props.filter))
    }
    const onFilterChanged = (filter: FilterType) => {
        const {pageSize} = props
        props.requestUsers(1, pageSize, filter)
    }

    return (
        <>
            <Users
                users={props.users}
                follow={props.follow}
                unFollow={props.unFollow}
                followingInProgress={props.followingInProgress}
                currentPage={props.currentPage}
                pageSize={props.pageSize}
                totalUsersCount={props.totalUsersCount}
                onPageChanged={onPageChanged}
                isFetching={props.isFetching}
                onFilterChanged={onFilterChanged}
            />
        </>
    )
}

const mapStateToProps = (state: RootStateType): mapStateToPropsType => {
    return {
        users: getUsers(state),
        // users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: followingInProgress(state),
        filter: getUsersFilter(state)
    }
}
// let withRedirect = withAuthRedirect(UsersContainer)
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


export default compose(connect<mapStateToPropsType, mapDispatchToPropsType, ownPropsType, RootStateType>(mapStateToProps, {
        follow, unFollow, requestUsers
    }
))(UsersContainer)