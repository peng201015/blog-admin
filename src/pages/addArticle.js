import React,{useState,useEffect} from 'react';
import '../static/css/addArticle.css'
import service from '../config/ipUrl'
import axios from "../config/axios"
import { Row, Col ,Input, Select ,Button ,DatePicker ,message} from 'antd'
import marked from 'marked'
const {Option} = Select;
const {TextArea} = Input;

function AddArticle(props) {
    const [articleId,setArticleId] = useState(0)  //文章id，0为新增，不是0位修改
    const [articleTitle,setArticleTitle] = useState('')  //文章标题
    const [articleContent,setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent,setMarkdownContent] = useState('')  //预览内容
    const [introducemd,setIntroducemd] = useState()  //简介的markdown内容
    const [introducehtml,setIntroducehtml] = useState('等待编辑')  //简介预览
    const [showDate,setShowDate] = useState()  //发布日期
    // const [updateDate,setUpdateDate] = useState()  //修改内容
    const [typeInfo ,setTypeInfo ] = useState([])  //文章类别信息
    const [selectedType,setSelectedType] = useState(1)  //选择的文章类别

    useEffect(() =>{
        getArticleType()

        let id = props.match.params.id;
        if(id) {
            setArticleId(id)
            getArticleDetail(id)
        }
    },[props.match.params.id])

    const getArticleDetail = (id) =>{
        axios({
            method:"get",
            url:service.getArticleDetail+id,
            withCredentials: true  //共享cookie
        }).then(res => {
            setArticleTitle(res.data.data[0].title)
            setArticleContent(res.data.data[0].article_content)
            let html=marked(res.data.data[0].article_content)
            setMarkdownContent(html)
            setIntroducemd(res.data.data[0].introduce)
            let tmpInt = marked(res.data.data[0].introduce)
            setIntroducehtml(tmpInt)
            setShowDate(res.data.data[0].addTime)
            setSelectedType(res.data.data[0].typeId)
        })
    }

    const getArticleType =() => {
        axios({
            method:"get",
            url:service.getType,
            withCredentials: true  //共享cookie
        }).then(res => {
            setTypeInfo(res.data.data)
        })
    }

    marked.setOptions({
        renderer:new marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
    });

    const changeContent = (e)=>{
        setArticleContent(e.target.value)
        let html = marked(e.target.value)
        setMarkdownContent(html)
    }
    const changeIntroduce  = (e)=>{
        setIntroducemd(e.target.value)
        let html = marked(e.target.value)
        setIntroducehtml(html)
    }
    const selectChange = (value) => {
        setSelectedType(value)
    }
    const saveArticle = (e) => {
        if(!selectedType){
            message.error('必须选择文章类别')
            return false
        }else if(!articleTitle){
            message.error('文章名称不能为空')
            return false
        }else if(!articleContent){
            message.error('文章内容不能为空')
            return false
        }else if(!introducemd){
            message.error('简介不能为空')
            return false
        }else if(!showDate){
            message.error('发布日期不能为空')
            return false
        }

        let form = {
            type_id:selectedType,
            title:articleTitle,
            article_content:articleContent,
            introduce:introducemd,
            addTime:showDate.replace('/',"-"),
        }
        if(articleId === 0) {
            form.view_count =0
            axios({
                method:"post",
                url:service.addArticle,
                data:form,
                withCredentials: true  //共享cookie
            }).then(res => {
                if(res.data.isSuccess) {
                    setArticleId(res.data.insertId)
                    message.success('文章发布成功')
                }else{
                    message.error('文章发布失败');
                }
            })
        } else{
            form.id = articleId;
            axios({
                method:"post",
                url:service.updateArticle,
                data:form,
                withCredentials: true  //共享cookie
            }).then(res => {
                if(res.data.isSuccess) {
                    message.success('文章更新成功')
                }else{
                    message.error('文章更新失败');
                }
            })
        }
        
    }

     
    return(
        <div>
            <Row gutter={5}>
                <Col span={18}>
                    <Row gutter={10}>
                        <Col span={20}>
                            <Input placeholder="博客标题" value={articleTitle} size="large" onChange={e => {setArticleTitle(e.target.value)}}></Input>
                        </Col>
                        <Col span={4}>
                            &nbsp;
                            <Select defaultValue={selectedType} onChange={selectChange} size="large">
                                {
                                    typeInfo.map((item,index) => {
                                        return(
                                            <Option key={index} value={item.id}>{item.typeName}</Option>
                                        )
                                    })
                                }
                                
                            </Select>
                        </Col>
                    </Row>
                    <br/>
                    <Row gutter={10}>
                        <Col span={12}>
                            <TextArea className="markdown-content" value={articleContent} rows={35} placeholder="文章内容" onChange={changeContent} onPressEnter={changeContent}></TextArea>
                        </Col>
                        <Col span={12}>
                            <div className="show-html" dangerouslySetInnerHTML={{__html:markdownContent}}></div>
                        </Col>
                    </Row>
                </Col>
                <Col span={6}>
                    <Row>
                        <Col span={24}>
                            <Button size="large">暂存文章</Button>&nbsp;
                            <Button type="primary" size="large" onClick={saveArticle}>发布文章</Button>
                            <br/>
                        </Col>
                        <Col span={24}>
                            <br/>
                            <TextArea rows={4} placeholder="文章简介" value={introducemd} onChange={changeIntroduce} onPressEnter={changeIntroduce}></TextArea>
                            <br/>
                            <br/>
                            <div className="introduce-html" dangerouslySetInnerHTML={{__html:'文章简介：'+introducehtml}}></div>
                        </Col>
                        <Col span={24}>
                            <div className="date-select">
                                <DatePicker
                                    onChange={(date,dateString)=> {setShowDate(dateString)}}
                                    placeholder="发布日期"
                                    size="large"  
                                    // value={showDate.replace("-","/")}
                                />
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>    
        </div>
    )
}

export default AddArticle