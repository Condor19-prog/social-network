import React from "react";
import s from './paginator.module.css';

type usersPropsType = {
    pageSize: number
    totalUsersCount: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    isFetching: boolean
}

const Paginator = (props: usersPropsType) => {

    let pageCount = Math.ceil(props.totalUsersCount / props.pageSize)
    const pages = []
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }

    return (
        <div className={s.page}>
            {pages.map((p, i) => {

                return <span key={i} className={props.currentPage === p ? s.selectedPages : ''}
                             onClick={() => props.onPageChanged(p)}>{p}</span>
            })}
        </div>
    )
}
export default Paginator