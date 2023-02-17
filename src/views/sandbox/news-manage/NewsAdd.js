import React, { useEffect, useState,useRef } from 'react'
import { Steps, Button, Form, Input, Select, message,notification } from 'antd'
import axios from 'axios'
import style from './News.module.css'
import NewsEditor from '../../../components/news-manage/NewsEditor';
export default function NewsAdd(props) {
    const {Option} = Select;
    const { Step } = Steps;
    //设置进度条的值
    const [current, setCurrent] = useState(0)
    //下拉框的值
    const [categoryList, setCategoryList] = useState([])
    //存对象信息 新闻标题 分类
    const [formInfo, setformInfo] = useState({})
    //存内容信息
     const [content, setContent] = useState("")

    //取表单form框的值
    const NewsForm = useRef()

    //localStorage储存的值
    const User = JSON.parse(localStorage.getItem("token")) //返回一个对象 {username: '钢蛋', password: '123', roleState: true, default: false, region: '南极洲', …}

    //点击下一步方法
    const handleNext = () => {
        if(current===0){
            NewsForm.current.validateFields().then(res=>{
                //console.log(res)
                setformInfo(res)    //存新闻标题 分类
                setCurrent(current + 1)
            }).catch(error=>{
                //console.log(error)
            })
        }else{
            if(content===''|| content.trim()==='<p></p>'){ //<p></p>
                message.error('不能输入为空')
            }else{
                setCurrent(current + 1)
                console.log(formInfo,content) //{title: 'lift', categoryId: 2}categoryId: 2title: "lift"[[Prototype]]: Object '<p> 晒呀</p>\n'
            }
        }
    }

    //点击下一步方法
    const handlePrevious = () => {
        setCurrent(-1)
    }
    //取值给下拉框用
    useEffect(()=>{
        axios.get("http://localhost:3000/categories").then(res=>{
            //console.log(res.data)
            setCategoryList(res.data)
        })
    },[])

    //
    const handleSave = (auditState) =>{
        axios.post('http://localhost:3000/news', {
            ...formInfo,
            "content": content,
            "region": User.region?User.region:"全球",
            "author": User.username,
            "roleId": User.roleId,
            "auditState": auditState,
            "publishState": 0,
            "createTime": Date.now(),
            "star": 0,
            "view": 0,
            // "publishTime": 0
        }).then(res=>{
            props.history.push(auditState===0?'/news-manage/draft':'/audit-manage/list')
            notification.info({
                message: `通知`,
                description:
                  `您可以到${auditState===0?'草稿箱':'审核列表'}中查看您的新闻`,
                placement:"bottomRight",
            });
        })
    }

    return (
        <div>
            <Steps current={current}>
                <Step title="基本信息" description="新闻标题，新闻分类" />
                <Step title="新闻内容" description="新闻主体内容" />
                <Step title="新闻提交" description="保存草稿或者提交审核" />
            </Steps>


            <div className={current === 0 ? '' : style.active}>1111111
                <Form
                    name="basic"
                    ref={NewsForm}
                >
                    <Form.Item
                        label="新闻标题"
                        name="title"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="新闻分类"
                        name="categoryId"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Select>
                            {
                                categoryList.map(item=><Option value={item.id} key={item.id} >{item.title}</Option>)
                            }
                        </Select>
                    </Form.Item>

                </Form>
            </div>

            <div className={current === 1 ? '' : style.active}>
                <NewsEditor getContent={(value)=>{ //子传父的值
                    console.log(value) //value 输出：<p>电风扇</p>
                    setContent(value) //存新闻内容
                }}>
                </NewsEditor>
            </div>
            <div className={current === 2 ? '' : style.active}>3333</div>

            <div style={{ marginTop: "50px" }}>
                {
                    current === 2 && <span>
                        <Button type="primary" onClick={()=> handleSave(0)}>保存草稿箱</Button>
                        <Button danger onClick={() => handleSave(1)}>提交审核</Button>
                    </span>
                }
                {
                    current < 2 && <Button type="primary" onClick={handleNext}>下一步</Button>
                }
                {
                    current > 0 && <Button onClick={handlePrevious}>上一步</Button>
                }
            </div>
        </div>
    )
}
