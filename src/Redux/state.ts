export type postsType = {
    id: number
    message: string
    likesCount: number
}
type messagesType = {
    id: number
    message: string
}
type dialogsType = {
    id: number
    name: string
}
export type profilePageType = {
    posts: Array<postsType>
    newPostText: string
}
export type dialogPageType = {
    dialogs: Array<dialogsType>
    messages: Array<messagesType>
}
export type rootStateType = {
    profilePage: profilePageType
    dialogPage: dialogPageType
}

export type storeType = {
    _state: rootStateType
    callSubscriber: (_state: rootStateType) => void
    addPost: () => void
    updateNewPostText: (newText: string) => void
    subscribe: (observer: () => void) => void
    getState: () => void
}

let store: storeType = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Bonjour', likesCount: 12},
                {id: 2, message: 'Когда вернешь долг?', likesCount: 100000}
            ],
            newPostText: ''
        },
        dialogPage: {
            messages: [
                {id: 1, message: 'Bonjour'},
                {id: 2, message: 'Hello'},
                {id: 3, message: 'Привет'},
                {id: 4, message: 'Heil'},
            ],
            dialogs: [
                {id: 1, name: 'Dimych'},
                {id: 2, name: 'Sveta'},
                {id: 3, name: 'Artem'},
                {id: 4, name: 'Ivan'},
            ]
        }
    },
    callSubscriber() {
        console.log('123')
    },
    addPost() {
        const newPost: postsType = {
            id: 5,
            message: this._state.profilePage.newPostText,
            likesCount: 0
        }
        this._state.profilePage.posts.push(newPost)
        this._state.profilePage.newPostText = ''
        this.callSubscriber(this._state)
    },
    updateNewPostText(newText: string) {
        this._state.profilePage.newPostText = newText
        this.callSubscriber(this._state)
    },
    subscribe(observer) {
        this.callSubscriber = observer
    },
    getState() {
        return this._state
    }
}

export default store


