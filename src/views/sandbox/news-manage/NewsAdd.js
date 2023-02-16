import React, { useEffect, useState,useRef } from 'react'
import {  Steps, Button, Form, Input, Select } from 'antd'
import axios from 'axios'
import style from './News.module.css'
import NewsEditor from '../../../components/news-manage/NewsEditor';
export default function NewsAdd() {
    const {Option} = Select;
    const { Step } = Steps;
    //设置进度条的值
    const [current, setCurrent] = useState(0)
    //下拉框的值
    const [categoryList, setCategoryList] = useState([])
    //取表单form框的值
    const NewsForm = useRef()
    //点击下一步方法
    const handleNext = () => {
        if(current===0){
            NewsForm.current.validateFields().then(res=>{
                console.log(res)
                setCurrent(current + 1)
            }).catch(error=>{
                console.log(error)
            })
        }else{
            setCurrent(current + 1)
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
                <NewsEditor >

                </NewsEditor>
            </div>
            <div className={current === 2 ? '' : style.active}>3333</div>

            <div style={{ marginTop: "50px" }}>
                {
                    current === 2 && <span>
                        <Button type="primary">保存草稿箱</Button>
                        <Button danger>提交审核</Button>
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
