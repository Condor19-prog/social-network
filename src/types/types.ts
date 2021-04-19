export type postsType = {
    id: string
    message: string
    likesCount: number
}

export  type photosType = {
    small: string | null
    large: string | null
}
export  type contactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type profileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: contactsType
    photos: photosType
    aboutMe: string
}
export type UserType = {
    id: number
    photos: photosType
    name: string
    status: string
    followed: boolean
}