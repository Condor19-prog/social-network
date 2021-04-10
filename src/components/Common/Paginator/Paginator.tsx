import React, {useState} from "react";
import s from './paginator.module.css';
import classnames from 'classnames'

type usersPropsType = {
    pageSize: number
    totalItemCount: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    portionSize?: number
}

const Paginator: React.FC<usersPropsType> = ({
                                                 pageSize, totalItemCount, currentPage,
                                                 onPageChanged, portionSize = 10
                                             }) => {

    let pageCount = Math.ceil(totalItemCount / pageSize)
    const pages = []
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }
    const portionCount = Math.ceil(pageCount / pageSize)
    const [portionNumber, setPortionNumber] = useState(1)
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionNumber = portionNumber * portionSize

    return (
        <div className={classnames(s.paginator)}>
            {portionNumber > 1 && <button onClick={() => setPortionNumber(portionNumber - 1)}>PREV</button>}
            {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionNumber).map((p) => {
                return <span className={classnames({[s.selectedPage]: currentPage === p}, s.pageNumber)} key={p}
                             onClick={() => onPageChanged(p)}>{p}</span>
            })}
            {portionCount > portionNumber &&
            <button onClick={() => setPortionNumber(portionNumber + 1)}>NEXT</button>}
        </div>
    )
}
export default Paginator