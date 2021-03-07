import {Dispatch} from "react";
import {sendMessageAC} from "../../Redux/dialogs-reducer";
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
        sendMessage: (newMessageBody: string) => {
            dispatch(sendMessageAC(newMessageBody))
        }
    }
}

export default compose(connect(
    mapStateToProps, mapDispatchTpProps),
    withAuthRedirect)
(Dialogs)