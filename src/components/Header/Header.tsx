import React from "react";
import {Avatar, Button, Layout, Space, Typography} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUser, selectIsAuth} from "../../Redux/auth-selector";
import {logOut} from "../../Redux/auth-reducer";
import {Link, NavLink} from "react-router-dom";

// export type MapPropsType = {}

export const AppHeader: React.FC = () => {
    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(selectCurrentUser)
    const dispatch = useDispatch()

    const {Header} = Layout
    const logOutCallback = () => {
        dispatch(logOut())
    }
    const {Text, Link} = Typography;
    return (
        <Header className="header">
            {
                isAuth ?
                    <Space size={'large'} style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Avatar style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
                        <Text style={{color: 'white', fontWeight: 'bold'}} italic>{login}</Text>
                        <Button onClick={logOutCallback}>Log Out</Button>
                    </Space> :
                    <Space style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <NavLink to={'/Login'}>Login</NavLink>
                    </Space>
            }
        </Header>
    )
}
