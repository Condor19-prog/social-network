import {instance} from "./api";

export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: string | null) {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha})
    },
    logOut() {
        return instance.delete(`auth/login`)
    }
}