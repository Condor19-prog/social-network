import {Dispatch} from "react";
import {sendMessageAC, UpdateNewMessageBodyAC} from "../../Redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {actionsType, RootState} from "../../Redux/redux-store";
import {withAuthRedirect} from "../../hok/withAuthRedirect";
import {compose} from "redux";


const mapStateToProps = (state: RootState) => {
    return {
        dialogsPage: state.dialogPage,
    }
}
const mapDispatchTpProps = (dispatch: Dispatch<actionsType>) => {
    return {
        UpdateNewMessageBody: (newMessageBody: string) => {
            dispatch(UpdateNewMessageBodyAC(newMessageBody))
        },
        sendMessage: () => {
            dispatch(sendMessageAC())
        }
    }
}

export default compose(connect(
    mapStateToProps, mapDispatchTpProps),
    withAuthRedirect)
(Dialogs)