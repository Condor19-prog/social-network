import React from "react";
import s from './FormsControl.module.css'
import {Field} from "redux-form";

type textAreaPropsType = {
    input?: any
    meta?: any
}
const FormControl: React.FC<textAreaPropsType> = ({meta: {touched, error}, children}) => {
    const hasError = touched && error
    return (
        <div className={s.formControl + ' ' + (hasError && s.error)}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const Textarea = (props: textAreaPropsType) => {
    const {input, meta, ...restProps} = props
    return <FormControl {...props}>
        <textarea {...input} {...restProps}/>
    </FormControl>
}

export const Input = (props: textAreaPropsType) => {
    const {input, meta, ...restProps} = props
    return <FormControl {...props}>
        <input {...input} {...restProps}/>
    </FormControl>
}

export const createField = (placeholder: string, name: string,
                            component: (props: textAreaPropsType) => void,
                            validate: any, props={}, text?: string) => (
    <div>
        <Field placeholder={placeholder}
               name={name}
               validate={validate}
               component={component}
               {...props}
        />
        {text}
    </div>
)