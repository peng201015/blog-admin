import React,{useState} from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {TeamOutlined} from '@ant-design/icons';
import "../static/css/layout.css";
import addArticle from './addArticle';
import articleList from './articleList';
import {Route} from 'react-router-dom';

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

function AdminLayout(props) {
    const [collapsed,setCollapsed] = useState(false)
    const onCollapse =(collapsed) =>{
        setCollapsed(collapsed)
    }
    const handleClickArticle = (e) => {
        if(e.key === "addArticle") {
            props.history.push("/index/add")
        }else if(e.key === "articleList") {
            props.history.push("/index/list")
        }
    }
    return(
    <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1">
                    <TeamOutlined />
                    <span>工作台</span>
                </Menu.Item>
                <Menu.Item key="2">
                    <TeamOutlined />
                    <span>添加文章</span>
                </Menu.Item>
                <SubMenu
                    key="sub1"
                    onClick={handleClickArticle}
                    title={
                        <span>
                        <TeamOutlined />
                        <span>文章管理</span>
                        </span>
                    }
                >
                    <Menu.Item key="addArticle">添加文章</Menu.Item>
                    <Menu.Item key="articleList">文章列表</Menu.Item>
                </SubMenu>
                <Menu.Item key="5">
                    <TeamOutlined />
                    <span>留言管理</span>
                </Menu.Item>
            </Menu>
        </Sider>
        <Layout>
            <Header style={{ background: '#fff', padding: 0 }} />
            <Content style={{margin:'0 16px'}}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>后台管理</Breadcrumb.Item>
                    <Breadcrumb.Item>工作台</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                    <Route path="/index" exact component={addArticle}></Route>
                    <Route path="/index/add" exact component={addArticle}></Route>
                    <Route path="/index/add/:id" exact component={addArticle}></Route>
                    <Route path="/index/list" exact component={articleList}></Route>
                </div>  
            </Content>
            <Footer style={{ textAlign: 'center' }}>JSPang.com</Footer>
        </Layout>
    </Layout>
    )
}

export default AdminLayout