import s from './button.module.css'

export const Button = (props: {title: string}) => {
    return (
        <div>
            <button className={s.borderButton}>{props.title}</button>
        </div>
    )
}