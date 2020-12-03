import React from "react";
import {actionsType, rootStateType, storeType} from "../../Redux/store";
import {sendMessageAC, UpdateNewMessageBodyAC} from "../../Redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";


const mapStateToProps = (state: rootStateType) => {
    return {
        dialogsPage: state.dialogPage
    }
}
const mapDispatchTpProps = (dispatch: any) => {
    return {
        UpdateNewMessageBody: (newMessageBody: string) => {
            dispatch(UpdateNewMessageBodyAC(newMessageBody))
        },
        sendMessage: () => {
            dispatch(sendMessageAC())
        }
    }
}
const DialogsContainer = connect(mapStateToProps, mapDispatchTpProps)(Dialogs)


export default DialogsContainer