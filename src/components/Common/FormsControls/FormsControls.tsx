import React from "react";
import s from './FormsControl.module.css'
import {Field, WrappedFieldMetaProps, WrappedFieldProps, WrappedFieldsProps} from "redux-form";
import {FieldValidatorType} from "../../../utils/validators/validator";

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
}
const FormControl: React.FC<FormControlPropsType> = ({meta: {touched, error}, children}) => {
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

export const Textarea = (props: WrappedFieldProps) => {
    const {input, meta, ...restProps} = props
    return <FormControl {...props}>
        <textarea {...input} {...restProps}/>
    </FormControl>
}

export const Input = (props: WrappedFieldProps) => {
    const {input, meta, ...restProps} = props
    return <FormControl {...props}>
        <input {...input} {...restProps}/>
    </FormControl>
}

export function createField<FormsKeysType extends string>(placeholder: string | undefined, name: FormsKeysType,
                            component: React.FC<WrappedFieldProps>,
                            validate: FieldValidatorType[], props = {}, text?: string) {
    return (
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
}