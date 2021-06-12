import React, {ComponentType} from 'react';
import {Link, Redirect, Route, Switch} from 'react-router-dom';
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {compose} from "redux";
import {initializeApp} from "./Redux/app-reducer";
import {RootStateType} from "./Redux/redux-store";
import Preloader from "./components/Common/Preloader/Preloader";
import {UsersPage} from "./components/Users/UsersContainer";
import {LoginPage} from "./components/Login/Login";
import 'antd/dist/antd.css';
import {Layout, Menu} from "antd";
import {LaptopOutlined, UserOutlined} from '@ant-design/icons';
import {AppHeader} from "./components/Header/Header";


const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));
const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ChatPage = React.lazy(() => import("./pages/chat/chat"));

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}
const {SubMenu} = Menu;
const {Header, Content, Footer, Sider} = Layout;

class App extends React.Component<MapPropsType & DispatchPropsType> {

    catchAllUnhandledErrors = () => {
        alert('Some error occurred')
    }

    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <Layout>
                <AppHeader/>
                <Content style={{padding: '0 50px'}}>
                    <Layout className="site-layout-background" style={{padding: '24px 0'}}>
                        <Sider className="site-layout-background" width={200}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                // defaultOpenKeys={['sub1']}
                                style={{height: '100%'}}
                            >
                                <SubMenu key="sub1" icon={<UserOutlined/>} title="My profile">
                                    <Menu.Item key="1"><Link to='/Profile'>Profile</Link>
                                    </Menu.Item>
                                    <Menu.Item key="2"> <Link to='/Dialogs'>Messages</Link></Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2" icon={<LaptopOutlined/>} title="Developers">
                                    <Menu.Item key="3"><Link to='/Users'>Users</Link></Menu.Item>
                                    <Menu.Item key="4"><Link to='/Chat'>Chat</Link></Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Content style={{padding: '0 24px', minHeight: 280}}>
                            <React.Suspense fallback={<Preloader/>}>
                                <Switch>
                                    <Route exact path='/' render={() => <Redirect to={'/Profile'}/>}/>
                                    <Route path='/Profile/:userId?' render={() => <ProfileContainer/>}/>
                                    <Route path='/Dialogs' render={() => <DialogsContainer/>}/>
                                    <Route path='/Users' render={() => <UsersPage/>}/>
                                    <Route path='/Login' render={() => <LoginPage/>}/>
                                    <Route path='/Chat' render={() => <ChatPage/>}/>
                                </Switch>
                            </React.Suspense>
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{textAlign: 'center'}}>Samurai Social Network ©2021 Created by IT-INCUBATOR</Footer>
            </Layout>
            // <div className={s.appWrapper}>
            //     <HeaderContainer/>
            //     <Navbar/>
            //     <div className={s.appWrapperContent}>
            //         <React.Suspense fallback={<Preloader/>}>
            //             <Switch>
            //                 <Route exact path='/' render={() => <Redirect to={'/Profile'}/>}/>
            //                 <Route path='/Profile/:userId?' render={() => <ProfileContainer/>}/>
            //                 <Route path='/Dialogs' render={() => <DialogsContainer/>}/>
            //                 <Route path='/Users' render={() => <UsersPage/>}/>
            //                 <Route path='/Login' render={() => <LoginPage/>}/>
            //             </Switch>
            //         </React.Suspense>
            //     </div>
            // </div>
        );
    }
}

const mapStateToProps = (state: RootStateType) => ({
    initialized: state.app.initialized
})
export default compose<ComponentType>(
    withRouter, connect(mapStateToProps, {initializeApp}))(App)
