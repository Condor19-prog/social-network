import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";


const Login = () => {
    const onSubmit = (formData: formDataType) => {
        console.log(formData)
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}
export default Login

type formDataType = {
    login: string
    password: string
    rememberMe: boolean
}

const LoginForm: React.FC<InjectedFormProps<formDataType>> = (props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field placeholder={'login'} name={'login'} component={'input'}/>
                </div>
                <div>
                    <Field type={'password'} placeholder={'password'} name={'password'} component={'input'}/>
                </div>
                <div>
                    <Field type="checkbox" component={'input'} name={'rememberMe'}/>Remember Me
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


const LoginReduxForm = reduxForm<formDataType>({form: 'login'})(LoginForm)
