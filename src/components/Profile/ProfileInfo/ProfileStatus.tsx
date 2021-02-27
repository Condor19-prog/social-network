import React from "react";

type profileStatusType = {
    status: string
}

class ProfileStatus extends React.Component<profileStatusType> {
    state = {
        editMode: false
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }
    deActivateEditMode = () => {
        this.setState({
            editMode: false
        })
    }

    render() {
        return (
            <div>
                {
                    !this.state.editMode &&
                    <div><span onDoubleClick={this.activateEditMode.bind(this)}>{this.props.status}</span></div>
                }
                {
                    this.state.editMode &&
                    <div><input type="text" value={this.props.status} onBlur={this.deActivateEditMode.bind(this)}
                                autoFocus/></div>
                }
            </div>
        )

    }
}

export default ProfileStatus