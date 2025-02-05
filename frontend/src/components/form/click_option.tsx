import React, { JSX, useState, useEffect } from "react";
import * as a from "../../type/alias"
import Str_to_h from "../../utils/str_to_h";
import { input_option_t } from "../../type/input";
import Search_bar from "./search_bar";

//  https://stackoverflow.com/questions/40209352/
//  how-to-specify-optional-default-props-with-typescript-for-stateless-functiona

// https://stackoverflow.com/questions/
// 58114855/handling-select-options-in-react-hooks

/*
import React, { useState, Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';

const App = () => {

  const [addrtype, setAddrtype] = useState("Work")
  const Add = ["Work", "Home", "school"]
  const handleAddrTypeChange = (e) => {setAddrtype(Add[e.target.value])}

  return (

   <><h1>{addrtype}</h1> < select
      onChange={e => handleAddrTypeChange(e)}
      className="browser-default custom-select" >
      {
        Add.map((address, key) => <option key={key}value={key}>{address}</option>)
      }
    </select ></>)


}

render(<App />, document.getElementById('root'));
*/


export default function Click_option(
{
    opt_name = undefined,
    available_opts,
    ss_mode,
    is_search_bar = false
}:{
    opt_name?:a.opt_name
    available_opts:string[]
    ss_mode:a.use_state_t<number>
    is_search_bar?:boolean
}){
    const [ss_show_opts, setss_show_opts] = useState<input_option_t[]>(()=>{
        return available_opts.map((item, index)=>{ return {name:item as a.name, value:index}})
    })
    // https://stackoverflow.com/questions/40676343/
    // typescript-input-onchange-event-target-value
    const handle_event = ((e: React.ChangeEvent<HTMLSelectElement >) => {
        ss_mode.setss(+e.target.value)
    }) as a.handle_event<HTMLSelectElement>
    
    let jsx_options = ss_show_opts.map((item)=>{
        return (<option value={item.value}>{item.name}</option>)
    })
    let jsx_search_bar = <></>
    if (is_search_bar===true){
        jsx_search_bar= <Search_bar<input_option_t, "name">
            opt_name={undefined as a.opt_name}
            read_only_arr={available_opts.map((item,index)=>{return {name:item,value:index} as input_option_t})}
            search_arr={
                {
                    ss:ss_show_opts, 
                    setss:setss_show_opts
                } as a.use_state_t<input_option_t[]>}
            property = "name"
        />
    }
    return (<>
        <Str_to_h opt_name={opt_name}/>
        {jsx_search_bar}
        <select value={ss_mode.ss} onChange={(e)=>handle_event(e)}>
            {jsx_options}
        </select>
    </>);
}
