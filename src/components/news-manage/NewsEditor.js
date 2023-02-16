import React,{useState} from 'react'
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function NewsEditor() {

    
    return (
        <div>
            <Editor /> 
        </div>
    )
}
