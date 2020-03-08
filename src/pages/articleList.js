import React,{useState,useEffect} from 'react';
import '../static/css/articleList.css'
import { List ,Row ,Col ,message ,Button} from 'antd';
import axios from "../config/axios"
import service from '../config/ipUrl'


function ArticleList(props) {
    const [list,setList] = useState([])

    const getList = () => {
        axios({
            method:"get",
            url:service.getArticleList,
            withCredentials: true
        }).then(res => {
            if(res) {
                setList(res.data.data)
            }
        })
    }
    
    const editArticle = (id) => {
        props.history.push("/index/add/"+id)
    }
    const deleteArticle = (id) => {
        axios({
            method:"get",
            url:service.delArticle+id,
            withCredentials: true
        }).then(res => {
            message.success('文章删除成功')
            getList()
        })
    }

    useEffect(() => {
        getList()
    },[])
    return(
        <div>
            <List
                header={
                    <Row className="list-div">
                        <Col span={8}>
                            <b>标题</b>
                        </Col>
                        <Col span={3}>
                            <b>类别</b>
                        </Col>
                        <Col span={3}>
                            <b>发布时间</b>
                        </Col>
                        <Col span={3}>
                            <b>集数</b>
                        </Col>
                        <Col span={3}>
                            <b>浏览量</b>
                        </Col>

                        <Col>
                            <b>操作</b>
                        </Col>
                    </Row>

                }
                bordered
                dataSource={list}
                renderItem={item =>(
                    <List.Item>
                        <Row className="list-div">
                            <Col span={8}>
                                {item.title}
                            </Col>
                            <Col span={3}>
                            {item.typeName}
                            </Col>
                            <Col span={3}>
                                {item.addTime}
                            </Col>
                            <Col span={3}>
                                共<span>{item.part_count}</span>集
                            </Col>
                            <Col span={3}>
                            {item.view_count}
                            </Col>

                            <Col span={4}>
                            <Button type="primary" onClick={()=>{editArticle(item.id)}}>修改</Button>&nbsp;

                            <Button onClick={()=>{deleteArticle(item.id)}}>删除 </Button>
                            </Col>
                        </Row>
                    </List.Item> 
                )}
            />
        </div>
    )
}

export default ArticleList