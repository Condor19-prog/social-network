import {instance, MeResponseType} from "./api";

type ResponseDataType = {
    id: number
    email: string
    login: string
}
type LoginResponseDataType = {
    userId: number
}
export const authAPI = {
    me() {
        return instance.get<MeResponseType<ResponseDataType>>(`auth/me`).then(res => res.data)
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: string | null) {
        return instance.post<MeResponseType<LoginResponseDataType>>(`auth/login`, {email, password, rememberMe, captcha})
            .then(res => res.data)
    },
    logOut() {
        return instance.delete(`auth/login`).then(res => res.data)
    }
}

