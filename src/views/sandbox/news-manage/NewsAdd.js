import React,{useState} from 'react'
import { Steps,Button} from 'antd'
import style from './News.module.css'
export default function NewsAdd() {
    const { Step } = Steps;
    const [current,setCurrent]=useState(0)

    const handleNext = () =>{
        setCurrent(current+1)
    }

    const handlePrevious = () =>{
        setCurrent(-1)
    }
    return (
        <div>
              <Steps current={current}>
                 <Step title="基本信息" description="新闻标题，新闻分类" />
                 <Step title="新闻内容" description="新闻主体内容" />
                 <Step title="新闻提交" description="保存草稿或者提交审核" />
             </Steps>


             <div className={current===0?'':style.active}>1111111
                 <input type="text"/>
             </div>

             <div className={current===1?'':style.active}>22222</div>
             <div className={current===2?'':style.active}>3333</div>

             <div style={{marginTop:"50px"}}>
                 {
                     current===2 && <span>
                         <Button type="primary">保存草稿箱</Button>
                         <Button danger>提交审核</Button>
                     </span>
                 }
                 {
                     current<2 && <Button type="primary" onClick={handleNext}>下一步</Button>
                 }
                 {
                     current>0 && <Button onClick={handlePrevious}>上一步</Button>
                 }
             </div>
        </div>
    )
}
