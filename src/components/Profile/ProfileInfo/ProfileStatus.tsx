import React, {ChangeEvent} from "react";

type profileStatusType = {
    status: string
    updateStatusTC: (status: string) => void
}

class ProfileStatus extends React.Component<profileStatusType> {

    state = {
        editMode: false,
        status: this.props.status
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
        this.props.updateStatusTC(this.state.status)
    }
    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps: any, prevState: any) {
        if (prevProps.status !== this.props.status)
            this.setState({
                status: this.props.status
            })
    }

    render() {
        return (
            <div>
                {
                    !this.state.editMode &&
                    <div><span onDoubleClick={this.activateEditMode}>{this.props.status || 'НЕТ СТАТУСА!!!!!!'}</span>
                    </div>
                }
                {
                    this.state.editMode &&
                    <div><input type="text" value={this.state.status} onBlur={this.deActivateEditMode}
                                autoFocus onChange={this.onStatusChange}/></div>
                }
            </div>
        )

    }
}

export default ProfileStatus