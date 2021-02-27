import React, {useEffect} from "react";
import {connect, useDispatch} from "react-redux";
import {RootState} from "../../Redux/redux-store";
import {
    followSuccess, followTC, getUsersTC,
    setCurrentPage,
    toggleIsFollowingProgress,
    unFollowSuccess, unFollowTC,
    userType
} from "../../Redux/users-reducer";
import Users from "./Users";
import {withAuthRedirect} from "../../hok/withAuthRedirect";
import {compose} from "redux";

type usersAPIComponentPropsType = {
    users: Array<userType>
    unFollowTC: (userId: number) => void
    followTC: (userId: number) => void
    totalUsersCount: number
    pageSize: number
    currentPage: number
    setCurrentPage: (pageNumber: number) => void
    isFetching: boolean
    followingIsProgress: any
    toggleIsFollowingProgress: (isFetching: boolean, userId: number) => void
}

const UsersContainer = (props: usersAPIComponentPropsType) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsersTC(props.currentPage, props.pageSize))
    }, [props.currentPage, props.pageSize])

    const onPageChanged = (pageNumber: number) => {
        dispatch(getUsersTC(pageNumber, props.pageSize))
    }

    return (
        <>
            <Users
                users={props.users}
                followTC={props.followTC}
                unFollowTC={props.unFollowTC}
                followingIsProgress={props.followingIsProgress}
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
        isFetching: state.usersPage.isFetching,
        followingIsProgress: state.usersPage.followingIsProgress
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


export default compose(withAuthRedirect, connect(mapStateToProps, {
        followSuccess, unFollowSuccess, setCurrentPage, toggleIsFollowingProgress, getUsersTC, followTC, unFollowTC
    }
))(UsersContainer)