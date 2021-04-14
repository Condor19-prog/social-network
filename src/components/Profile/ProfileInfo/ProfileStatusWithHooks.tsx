import React, {ChangeEvent, useEffect, useState} from "react";

type profileStatusType = {
    status: string
    updateStatus: (status: string) => void
}

const ProfileStatusWithHooks: React.FC<profileStatusType> = ({status, updateStatus}) => {

    const [editMode, setEditMode] = useState(false)
    const [value, setValue] = useState(status)
    useEffect(() => {
        setValue(status)
    }, [status])
    const activateMode = () => {
        setEditMode(true)
    }
    const deactivatedEditMode = () => {
        setEditMode(false)
        updateStatus(value)
    }
    const onStatusCHanged = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    return (
        <div>
            {!editMode &&
            <div><b>Status: </b><span onDoubleClick={activateMode}>{status || 'НЕТ СТАТУСА!!!!!!'}</span></div>
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