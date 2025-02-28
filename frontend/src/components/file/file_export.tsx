import React from "react";
import * as a from "../../type/alias"
import BUTTON_CLICK from "../button/button_click";
import { file_to_date, file_to_url } from "../../utility/convert";

export default function FILE_EXPORT({
    file_arr,
    file_name=undefined,
    multiple=false
}:{
    file_arr:a.use_state_t<File[]>
    file_name?:string|undefined
    multiple?:boolean
}){
    const func_event = () =>{
        let upload_name = file_name
        if(upload_name === undefined){
            upload_name = "upload_file_" + file_to_date() + ".zip"
        }
        if (file_arr.ss.length > 0){
            const UPLOAD_FILE = multiple ? new File(file_arr.ss, upload_name) : file_arr.ss[0]
            const UPLOAD_URL = file_to_url(UPLOAD_FILE)
            const A = document.createElement("a")
            A.href = UPLOAD_URL
            A.setAttribute("download", UPLOAD_FILE.name)
            document.body.appendChild(A)
            A.click()
            A.remove()
        }
    }
    return <>
    <BUTTON_CLICK 
        name={"upload file" as a.name} 
        func_event={func_event as a.func_event}
    />
    </>
}