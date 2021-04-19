import React, {Dispatch} from "react";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import { RootStateType} from "../../Redux/redux-store";
import {withAuthRedirect} from "../../hok/withAuthRedirect";
import {compose} from "redux";
import {action, ActionsType} from "../../Redux/dialogs-reducer";


const mapStateToProps = (state: RootStateType) => {
    return {
        dialogsPage: state.dialogPage,
    }
}
const mapDispatchTpProps = (dispatch: Dispatch<ActionsType>) => {
    return {
        sendMessage: (newMessageBody: string) => {
            dispatch(action.sendMessage(newMessageBody))
        }
    }
}

export default compose<React.ComponentType>(connect(
    mapStateToProps, mapDispatchTpProps),
    withAuthRedirect)
(Dialogs)