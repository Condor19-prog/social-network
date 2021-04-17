import React from "react";
import {connect, useDispatch} from "react-redux";
import {loginTC} from "../../Redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../Common/FormsControls/FormsControls";
import {requiredField} from "../../utils/validators/validator";
import {rootStateType} from "../../Redux/redux-store";
import s from '../Common/FormsControls/FormsControl.module.css'

type loginFormOwnProps = {
    captcha: string | null
}
export type formDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
type LoginFormValueTypeKey = Extract<keyof formDataType, string>

const LoginForm: React.FC<InjectedFormProps<formDataType, loginFormOwnProps> & loginFormOwnProps> = ({
                                                                                                         handleSubmit,
                                                                                                         error,
                                                                                                         captcha
                                                                                                     }) => {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                {createField<LoginFormValueTypeKey>('Email', 'email', Input, [requiredField], {type: 'text'})}
                {createField<LoginFormValueTypeKey>('Password', 'password', Input, [requiredField], {type: 'password'})}
                {createField<LoginFormValueTypeKey>(undefined, 'rememberMe', Input, [], {type: 'checkbox'}, 'rememberMe')}
                {captcha && <img src={captcha} alt={'123'}/>}
                {captcha && createField<LoginFormValueTypeKey>('Symbols from image', 'captcha', Input, [requiredField], {type: 'text'})}

                {error && <div className={s.formSummaryError}>{error}</div>}
                <div>
                    <button>
                        Login
                    </button>
                </div>
            </form>
        </div>
    )
}

type loginPropsType = {
    isAuth: boolean
    captcha: string | null
}

export const LoginReduxForm = reduxForm<formDataType, loginFormOwnProps>({form: 'login'})(LoginForm)

const Login: React.FC<loginPropsType> = ({isAuth, captcha}) => {

    const dispatch = useDispatch()
    const onSubmit = (formData: formDataType) => {
        dispatch(loginTC(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }
    if (isAuth) {
        return <Redirect to={'/Profile'}/>
    }
    return (
        <div>
            <h3>login into your account</h3>
            <LoginReduxForm onSubmit={onSubmit} captcha={captcha}/>
        </div>
    )
}
const mapStateToProps = (state: rootStateType): loginPropsType => ({
    isAuth: state.auth.isAuth,
    captcha: state.auth.captcha
})
export default connect(mapStateToProps, {loginTC})(Login)



