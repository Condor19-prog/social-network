import React, {Dispatch} from "react";
import {connect} from "react-redux";
import Users from "./Users";
import {actionsType, RootState} from "../../Redux/redux-store";
import {followAC, setUsersAC, unFollowAC, userType} from "../../Redux/users-reducer";

const mapStateToProps = (state: RootState) => {
    return {
        users: state.usersPage.users
    }
}
const mapDispatchToProps = (dispatch: Dispatch<actionsType>) => {
    return {
        follow: (userId: string) => {
            dispatch(followAC(userId))
        },
        unFollow: (userId: string) => {
            dispatch(unFollowAC(userId))
        },
        setUsers: (users: Array<userType>) => {
            dispatch(setUsersAC(users))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
