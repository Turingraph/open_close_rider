import {useEffect, useState} from "react";
import * as a from '../../type/alias'
import OPT_INPUT from "../../components/opt/opt_input";
import SEARCH_BAR from "../../components/opt/search_bar";
import { opt_mode_uit } from "../../components/opt/type";
import { character_t, CHARACTERS, OPT_NAME } from "../constant";
import OPT_EXIST_ARR from "../../components/opt/opt_exist_arr";
import PANEL from "../../components/asset/panel";
import { STR_TO_H, str_to_optmode } from "../../utils/convert";
import OBJ_SELF from "../../components/obj/obj_self";
import OBJ_BOOL from "../../components/obj/obj_bool";
import OBJ_STR from "../../components/obj/obj_str";
import { handle_access_optmode } from "../../utils/utils";

export function TEST_OPT_EXIST_ARR(){
    const [ss_arr, setss_arr] = useState<number[]>([0])
    // const AVAILABLE_OPTS = CHARACTERS.map((item)=>{return item.name}) as string[]
    const AVAILABLE_OPTS = OPT_NAME
    return <OPT_EXIST_ARR 
        opt_name={"List" as a.opt_name}
        exist_opts={{ss:ss_arr, setss:setss_arr}}
        available_opts={AVAILABLE_OPTS}
        is_search_bar={true}
        />
}

export function TEST_OPT_INPUT(){
    const [ss_name, setss_name] = useState<number>(0)

    return <>
    <OPT_INPUT
        opt_name={"Your name is " + OPT_NAME[ss_name] as a.opt_name }
        available_opts={OPT_NAME}
        ss_mode={{ss:ss_name, setss:setss_name} as a.use_state_t<number|undefined>}
        is_search_bar = {true}
    />
    </>
}

export function TEST_SEARCH_BAR(){
    const [ss_name, setss_name] = useState<opt_mode_uit[]>(
        OPT_NAME.map((item,index)=>{
            return {
                name:item as a.name,
                index:index
            }
        })
    )
    const JSX_ELEMENT = ss_name.map((item,index)=>{return <h1 key={index}>{item?item.name:""}</h1>})
    return <>
        <SEARCH_BAR 
        opt_name={"Your name" as a.opt_name}
        read_only_arr={OPT_NAME}
        setss_select_arr={setss_name}
        />
        <PANEL jsx_element={<>{JSX_ELEMENT}</>}/>
    </>
}

export function TEST_SEARCH_SELF(){
    const [ss_arr, setss_arr] = useState<character_t[]>(CHARACTERS)
    const [ss_show_arr, setss_show_arr] = useState<opt_mode_uit[]>(
        str_to_optmode(ss_arr)
    )
    const [ss_select, setss_select] = useState<number|undefined>(undefined)

    const JSX_ARR = ss_show_arr.map((item,index)=>{
        if(item !== undefined){
            return <div key={index}>
                <STR_TO_H opt_name={item.name}/>
                <OBJ_SELF 
                arr = {{ss:ss_arr, setss:setss_arr}}
                this_item={item.index}
                ss_select={{ss:ss_select, setss:setss_select}}
                jsx_additional={<>
                <OBJ_BOOL
                    name={"rule64" as a.name}
                    arr={{ss:ss_arr, setss:setss_arr}}
                    this_item={item.index}
                    attr={"is_male"}
                    ui_mode={"checkbox"}
                />
                <OBJ_STR
                    opt_name={item.name as a.opt_name}
                    arr={{ss:ss_arr, setss:setss_arr}}
                    this_item={item.index}
                    attrs={["skill"]}
                    is_undo={false}
                />
                </>}
                />
                <hr/>
                </div>
        }
        else{
            return <></>
        }
    })
    return <>
    <SEARCH_BAR 
    opt_name={"Your name" as a.opt_name}
    read_only_arr={ss_arr}
    setss_select_arr={setss_show_arr}
    />
    <PANEL jsx_element={<>{JSX_ARR}</>}/>
    </>
}
