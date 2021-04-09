import React from "react";
import {connect, useDispatch} from "react-redux";
import {loginTC} from "../../Redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../Common/FormsControls/FormsControls";
import {requiredField} from "../../utils/validators/validator";
import {rootStateType} from "../../Redux/redux-store";
import s from '../Common/FormsControls/FormsControl.module.css'

type loginType = {
    isAuth: boolean
}

const Login: React.FC<loginType> = ({isAuth}) => {
    const dispatch = useDispatch()

    const onSubmit = (formData: formDataType) => {
        dispatch(loginTC(formData.email, formData.password, formData.rememberMe))
    }
    if (isAuth) {
        return <Redirect to={'/Profile'}/>
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}
const mapStateToProps = (state: rootStateType) => ({
    isAuth: state.auth.isAuth
})
export default connect(mapStateToProps, {loginTC})(Login)

export type formDataType = {
    email: string
    password: string
    rememberMe: boolean
}

const LoginForm: React.FC<InjectedFormProps<formDataType>> = ({handleSubmit, error}) => {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                {createField('Email', 'email', Input,requiredField, {type: 'text'})}
                {createField('Password', 'password', Input,requiredField, {type: 'password'})}
                {createField('', 'rememberMe', Input,null, {type: 'checkbox'}, 'rememberMe')}
                {/*<Field placeholder={'email'}*/}
                {/*       name={'email'}*/}
                {/*       component={Input}*/}
                {/*       validate={[requiredField]}/>*/}
                {/*<div>*/}
                {/*    <Field type="checkbox"*/}
                {/*           name={'rememberMe'}*/}
                {/*           component={Input}/>Remember Me*/}
                {/*</div>*/}
                {error && <div className={s.formSummaryError}>Error</div>}
                <div>
                    <button>
                        Login
                    </button>
                </div>
            </form>
        </div>
    )
}

export const LoginReduxForm = reduxForm<formDataType>({form: 'login'})(LoginForm)

