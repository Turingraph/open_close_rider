import React, {useState} from "react";
import * as a from "../../type/alias"
import Factory_obj from "../../components/factory/factory_obj";
import Click_button, {click_button_t} from "../../components/button/click_button";
import { Opt_to_jsx_arr } from "../../utils/convert";
import Search_bar from "../../components/search/search_bar";
import Panel from "../../components/asset/panel";
import { img_t } from "../../type/obj";
import { opt_mode_uit } from "../../type/input_ui";
import Select_button from "../../components/factory/select_button";

export default function Page_multi_imgs(){
    const [ss_img_arr, setss_img_arr] = useState<img_t[]>([])
    const [ss_img_filter, setss_img_filter] = useState<(opt_mode_uit|undefined)[]>([])
    const BUTTON_ARR:click_button_t[] = [
        {
            name:"open folder" as a.name,
            func_event:(()=>undefined) as a.func_event
        },
        {
            name:"open image" as a.name,
            func_event:(()=>undefined) as a.func_event
        },
        {
            name:"save" as a.name,
            func_event:(()=>undefined) as a.func_event
        },
        {
            name:"reset image" as a.name,
            func_event:(()=>undefined) as a.func_event
        },
        {
            name:"activate image processing" as a.name,
            func_event:(()=>undefined) as a.func_event
        },
        {
            name:"activate ocr" as a.name,
            func_event:(()=>undefined) as a.func_event
        },
        {
            name:"activate dilate image processing" as a.name,
            func_event:(()=>undefined) as a.func_event
        },
        {
            name:"select all images" as a.name,
            func_event:(()=>undefined) as a.func_event
        },
        {
            name:"unselect all image" as a.name,
            func_event:(()=>undefined) as a.func_event
        },
        {
            name:"help" as a.name,
            func_event:(()=>undefined) as a.func_event
        },
    ]
    const JSX_BUTTON_ARR = Opt_to_jsx_arr({arr:BUTTON_ARR,jsx_element:Click_button})
    const JSX_SEARCH_IMG = <Search_bar
        opt_name={"Search image" as a.opt_name}
        read_only_arr={ss_img_arr}
        select_arr={{
            ss:ss_img_filter, 
            setss:setss_img_filter
        }}
        key={"name"}
    />
    const JSX_IMG_ARR = ss_img_filter.map((item, index)=>{
        if(item != undefined){
            return <>
                <Factory_obj
                arr={{
                    ss:ss_img_arr, 
                    setss:setss_img_arr
                }}
                index={item.index}
                jsx_additional={
                    <>
                    <Select_button 
                    arr={{
                        ss:ss_img_arr, 
                        setss:setss_img_arr
                    }}
                    index={item.index}
                    key={"select"}
                    />
                    </>
                }
                />
            </>
        }
    })
    return <>
        {JSX_BUTTON_ARR}
        {JSX_SEARCH_IMG}
        <Panel jsx_element={<>{JSX_IMG_ARR}</>}/>
    </>
}