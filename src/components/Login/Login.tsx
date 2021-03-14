import React from "react";
import {connect} from "react-redux";
import {loginTC} from "../../Redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../Common/FormsControls/FormsControls";
import {requiredField} from "../../utils/validators/validator";


const Login = (props: any) => {
    const onSubmit = (formData: formDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }
    if (props.isAuth) {
        return <Redirect to={'/Profile'}/>
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}
const mapStateToProps = (state: any) => ({
    isAuth: state.auth.isAuth
})
export default connect(mapStateToProps, {loginTC})(Login)

export type formDataType = {
    email: string
    password: string
    rememberMe: boolean
}

const LoginForm: React.FC<InjectedFormProps<formDataType>> = (props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field placeholder={'email'}
                           name={'email'}
                           component={Input}
                           validate={[requiredField]}/>
                </div>
                <div>
                    <Field type={'password'}
                           placeholder={'password'}
                           name={'password'}
                           component={Input}
                           validate={[requiredField]}/>
                </div>
                <div>
                    <Field type="checkbox"
                           name={'rememberMe'}
                           component={Input}/>Remember Me
                </div>
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

