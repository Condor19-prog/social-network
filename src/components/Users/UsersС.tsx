import React from "react";
import s from './users.module.css'
import axios from 'axios';
import userPhoto from '../../assets/photo/user-male.png'
import {userType} from "../../types/types";

class UsersC extends React.Component<any, any> {

    componentDidMount(){
        axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
                this.props.setUsers(response.data.items)
            }
        )
    }

    render() {
        return <div>
            {
                this.props.users.map((u: userType) => <div key={u.id}>
                <span>
                    <div>
                        <img src={u.photos.small !== null ? u.photos.small : userPhoto} className={s.userPhoto}
                             alt={'small'}/>
                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => {
                                this.props.unFollow(u.id)
                            }}>Unfollow</button>
                            : <button onClick={() => {
                                this.props.follow(u.id)
                            }}>Follow</button>
                        }
                    </div>
                </span>
                        <span>
                        <span>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                         </span>
                    <span>
                        <div>

                        </div>
                    </span>
                </span>
                    </div>
                )
            }
        </div>
    }
}

export default UsersC