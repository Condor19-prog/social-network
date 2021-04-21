import React from "react";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {RootStateType} from "../../Redux/redux-store";
import {withAuthRedirect} from "../../hok/withAuthRedirect";
import {compose} from "redux";
import {action} from "../../Redux/dialogs-reducer";

const mapStateToProps = (state: RootStateType) => {
    return {
        dialogsPage: state.dialogPage,
    }
}

export default compose<React.ComponentType>(connect(
    mapStateToProps, {...action}),
    withAuthRedirect)
(Dialogs)