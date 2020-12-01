import React from "react";

import {storeType} from "../../Redux/store";
import {sendMessageAC, UpdateNewMessageBodyAC} from "../../Redux/dialogs-reducer";
import Dialogs from "./Dialogs";

type dialogsPropsType = {
    store: storeType
}

function DialogsContainer(props: dialogsPropsType) {
    const state = props.store.getState().dialogPage

    const onSendMessageClick = () => {
        props.store.dispatch(sendMessageAC())
    }
    const onNewMessageChange = (newMessageBody: string) => {
        props.store.dispatch(UpdateNewMessageBodyAC(newMessageBody))
    }

    return <Dialogs UpdateNewMessageBody={onNewMessageChange} sendMessage={onSendMessageClick}
                    dialogsPage={state}
    />
}

export default DialogsContainer