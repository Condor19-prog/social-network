import React from "react";
import {useSelector} from "react-redux";
import Users from "./Users";
import {getIsFetching,} from "../../Redux/users-selector";
import Preloader from "../Common/Preloader/Preloader";

type UsersPagePropsType = {}

export const UsersPage: React.FC<UsersPagePropsType> = (props) => {

    const isFetching = useSelector(getIsFetching)

    return (
        <>
            {isFetching ? <Preloader/> : null}
            <Users/>
        </>
    )
}

