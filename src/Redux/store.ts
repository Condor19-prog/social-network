import React from "react";
//
// import  {addPostACType} from "./profile-reducer";
//
//
// export type actionsType =
//     addPostActionType |
//     updateNewPostTextType |
//     updateNewMessageBodyType |
//     sendMessageType |
//     addPostACType
// }
//
// export type sendMessageType = {
//     type: 'SEND-MESSAGE'
// }
// export type updateNewMessageBodyType = {
//     type: 'UPDATE-NEW-MESSAGE-BODY'
//     messageBody: string
// }
// export type addPostActionType = {
//     type: 'ADD-POST'
//     newPostText: string
// }
// export type updateNewPostTextType = {
//     type: 'UPDATE-NEW-POST-TEXT'
//     newText: string
// }
//
// export type postsType = {
//     id: string
//     message: string
//     likesCount: number
// }
// export type messagesType = {
//     id: string
//     message: string
// }
// export type dialogsType = {
//     id: string
//     name: string
// }
// export type profilePageType = {
//     posts: Array<postsType>
//     newPostText: string
// }
// export type dialogPageType = {
//     dialogs: Array<dialogsType>
//     messages: Array<messagesType>
//     newMessageBody: string
// }
// export type rootStateType = {
//     profilePage: profilePageType
//     dialogPage: dialogPageType
// }
// export type storeType = {
//     _state: rootStateType
//     renderEntireTree: (_state: rootStateType) => void
//     subscribe: (observer: () => void) => void
//     getState: () => rootStateType
//     dispatch: (action: actionsType) => void
// }

// export const store: storeType = {
//     _state: {
//         profilePage: {
//             posts: [
//                 {id: v1(), message: 'Bonjour', likesCount: 12},
//                 {id: v1(), message: 'Когда вернешь долг?', likesCount: 100000}
//             ],
//             newPostText: ''
//         },
//         dialogPage: {
//             messages: [
//                 {id: v1(), message: 'Bonjour'},
//                 {id: v1(), message: 'Hello'},
//                 {id: v1(), message: 'Привет'},
//                 {id: v1(), message: 'Heil'},
//             ],
//             dialogs: [
//                 {id: v1(), name: 'Dimych'},
//                 {id: v1(), name: 'Sveta'},
//                 {id: v1(), name: 'Artem'},
//                 {id: v1(), name: 'Ivan'},
//             ],
//             newMessageBody: ''
//         }
//     },
//     renderEntireTree() {
//         console.log('123')
//     },
//     getState() {
//         return this._state
//     },
//     subscribe(observer) {
//         this.renderEntireTree = observer
//     },
//
//     dispatch() {
//         this._state.profilePage = profileReducer(this._state.profilePage, action)
//         this._state.dialogPage = dialogsReducer(this._state.dialogPage, action)
//         this.renderEntireTree(this._state)
//     }
// }
//
//
//

// export default store


