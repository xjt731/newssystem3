import React,{useState} from 'react'
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function NewsEditor(props) {

    const [editorState, setEditorState] = useState("")
    return (
        <div>
            <Editor 
                editorState={editorState}
                toolbarClassName="toolbarClassName" //控制样式
                wrapperClassName="wrapperClassName" //控制样式
                editorClassName="editorClassName"   //控制样式
                onEditorStateChange={(editorState)=>setEditorState(editorState)} //不写这行无法输入
                onBlur={()=>{
                    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent()))) //editorState.getCurrentContent() 输出：ContentState {_map: Map, __ownerID: undefined} //convertToRaw(editorState.getCurrentContent()) 输出：{blocks: Array(1), entityMap: {…}}  //draftToHtml(convertToRaw(editorState.getCurrentContent())) 输出：<p>内存</p>

                    props.getContent(564)
                    props.getContent(draftToHtml(convertToRaw(editorState.getCurrentContent()))) //getContent() 括号里面传什么，父组件就接收什么
                }}
            /> 
        </div>
    )
}
