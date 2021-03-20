import React, {ChangeEvent, useState} from "react";
import {useDispatch} from "react-redux";
import {updateStatusTC} from "../../../Redux/profile-reducer";

type profileStatusType = {
    status: string
}

const ProfileStatusWithHooks: React.FC<profileStatusType> = ({status}) => {
    const dispatch = useDispatch()
    const [editMode, setEditMode] = useState(false)
    const [value, setValue] = useState(status)

    const activateMode = () => {
        setEditMode(true)
    }
    const deactivatedEditMode = () => {
        setEditMode(false)
        dispatch(updateStatusTC(value))
    }
    const onStatusCHanged = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    return (
        <div>
            {
                !editMode &&
                <div><span onDoubleClick={activateMode}>{status || 'НЕТ СТАТУСА!!!!!!'}</span></div>
            }
            {
                editMode &&
                <div>
                    <input type="text"
                           value={value}
                           onChange={onStatusCHanged}
                           onDoubleClick={activateMode}
                           autoFocus
                           onBlur={deactivatedEditMode}/>
                </div>
            }
        </div>
    )
}

export default ProfileStatusWithHooks