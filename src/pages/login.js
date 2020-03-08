import React,{useState} from 'react';
import '../static/css/login.css';
import 'antd/dist/antd.css';
import service from '../config/ipUrl'
import axios from "axios"
import { Card, Input,Button ,Spin,message} from 'antd';
import {TeamOutlined,KeyOutlined} from '@ant-design/icons';

const Login = (props) => {
    const [userName,setUserName] = useState('')
    const [password,setPassword] = useState('')
    const [isLoading,setIsLoading] = useState(false)

    const handlerLogin=() => {
        if(!userName){
            message.error('用户名不能为空')
            return false
        }else if(!password){
            message.error('密码不能为空')
            return false
        }
        setIsLoading(true)
        let form = {userName,password};
        axios({
            method:"post",
            url:service.checkLogin,
            data:form,
            withCredentials: true  //共享cookie
        }).then(res => {
            setIsLoading(false)
            if(res.data.code === 1) {
                localStorage.setItem("openId",res.data.openId)
                props.history.push("/index")
            } else {
                message.error('账号或密码错误')
            }
        })
    }

    return(
        <div className="login-div">
            <Spin tip="Loading..." spinning={isLoading}>
                <Card title="JSPang Blog  System" bordered={true} style={{ width: 400 }} >
                <Input
                    id="userName"
                    size="large"
                    placeholder="Enter your userName"
                    prefix={<TeamOutlined />}
                    onChange={(e)=>{setUserName(e.target.value)}}
                />
                <Input
                    id="password"
                    size="large"
                    placeholder="Enter your password"
                    prefix={<KeyOutlined />}
                    onChange={(e) => {setPassword(e.target.value)}}
                />
                <Button type="primary" size="large" block onClick={handlerLogin} > Login in </Button>
                </Card>
            </Spin>
        </div>
    )
}

export default Login