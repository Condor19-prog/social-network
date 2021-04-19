import axios from "axios";
import {UserType} from "../types/types";

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': 'c9904dcf-3bb3-447f-a0b3-278ebd3674e9'
    }
})

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}


export type GetItemsType = {
    items: UserType[]
    totalCount: number
    error: string | null
}
export type MeResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    messages: string[]
    resultCode: RC
}