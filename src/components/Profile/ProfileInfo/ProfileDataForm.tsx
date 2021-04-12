import React from "react";

type profileDataForm = {
    profile: any
}

export const ProfileDataForm = (props: profileDataForm) => {
const {profile} = props
    return (
            <div>
                {props.isOwner &&
                <div>
                    <button onClick={props.goToEditMode}>Save</button>
                </div>}
                <div><b>Full name:</b> {profile.fullName}</div>
                <b>Looking for a job:</b> {profile.lookingForAJob ? 'yes' : 'no'}
                {profile.lookingForAJob &&
                <div>
                    <b>My professional skills:</b>{props.profile.lookingForAJobDescription}
                </div>
                }
                <div>
                    <b>About me:</b> {profile.aboutMe}
                </div>
                <div>
                    <b>Contacts:</b> {profile.contacts && Object.keys(profile.contacts).map(key => {
                    return <Contacts key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
                })}
                </div>
            </div>
    )
}