import React, { useState } from "react";
import {Layout, Menu} from 'antd';
import {Route, Link} from "react-router-dom";
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Client from "../client";
import ClientPage from "../client/clientPage";
import * as authActions from '../../actions/authActions';
import "./dashboard.scss";
const { Sider, Content} = Layout;

function Dashboard(props) {  
    const [openMenu, setOpenMenu] = useState(false);
    const handleMenu = value => {
        console.log(value)
        setOpenMenu(value);
    }
    return(
        <Layout>
            <Sider className={openMenu ? "" : "dashboard-sider"} theme="light" trigger={null}>
            <Menu mode="inline" style={{textAlign:'left'}} selectedKeys={['1']} >
                <div className="menu-logo">
                    <div className="logo">
                        <img src="/assets/logo.png" alt="logo"/>
                    </div>  
                </div>                     
                <Menu.Item key="1">
                    <Link to={'/dashboard/client'}>
                        <img src={'/assets/client.png'} alt="client"/>
                        <span>Клиенты</span>
                    </Link>
                </Menu.Item>
                <Menu.Item onClick={() => props.authActions.signOut(props.history)}  key="2">
                    <Link to={'/dashboard/client'}>
                        <img src={'/assets/exit.png'} alt="client"/>
                        <span>Выход</span>
                    </Link>
                </Menu.Item>
            </Menu>
            </Sider>
            <Layout>             
                <Content
                    style={{
                        margin: '0',                      
                        background: '#F5F5F5',
                        height:'100%',

                    }}>
                    <Route exact path='/dashboard/client' render={() => <Client menu={openMenu} handleMenu={handleMenu}/>} />
                    <Route exact path='/dashboard/client/:id' render={() => <ClientPage menu={openMenu} handleMenu={handleMenu}/>} />
                </Content>
            </Layout>
        </Layout>
    )
}

const mapDispatchToProps = dispatch => ({
    authActions: bindActionCreators(authActions, dispatch)
});
export default connect(null, mapDispatchToProps) (withRouter(Dashboard));