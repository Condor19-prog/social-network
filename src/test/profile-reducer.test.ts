import {v1} from "uuid";
import profileReducer, {addPostAC, deletePostAC} from "../Redux/profile-reducer";
import {profileType} from "../types/types";

const state = {
    posts: [
        {id: v1(), message: 'Bonjour', likesCount: 12},
        {id: v1(), message: 'Когда вернешь долг?', likesCount: 100000}
    ],
    profile: null as profileType | null,
    status: 'Hi! i am React JS Junior developer and I am looking for a job'
}

test('length of post should be incremented', () => {

    const action = addPostAC('new text')
    const newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(3)
})
test('message of new post should be correct', () => {

    const action = addPostAC('new text')
    const newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(3)
    expect(newState.posts[2].message).toBe('new text')
})

test('after deleting length of messages should be decrement', () => {
    const action = deletePostAC(state.posts[0].id)
    const newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(1)
})