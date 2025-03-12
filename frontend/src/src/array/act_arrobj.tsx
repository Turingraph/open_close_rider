import { useReducer } from "react"
import * as a from "../type/alias"
import * as oarr from "./func_arrobj"
// import { useReducer } from "react"

// Learn Custom Hooks In 10 Minutes
// https://youtu.be/6ThXsUwLWvc?si=TOVkyJuod3AuQxMS

// How Did I Not Know This TypeScript Trick Earlier??!
// https://youtu.be/9i38FPugxB8?si=G9EBCw2mXhiQ2dMz

export type ss_arrobj_t<
t extends object[], 
k extends keyof t[number]> = {
    ss:t,
    sort_mode?:undefined|"NO_SORT"|"SORT"|"REVERSE",
    sort_attr?:undefined|k
}

export type act_arrobj_t<
    t extends object[], 
    k extends keyof t[number], 
    o extends t[number][k]> = {
    type:"SORT",
    sort_mode?:undefined|"NO_SORT"|"SORT"|"REVERSE",
    sort_attr?:undefined|k,
} | {
    type:"PUSH",
    input:t[number]
}
| {
    type:"DELETE",
    index:number
}
| {
    type:"EDIT_ATTR",
    index:number,
    attr:k,
    input:o,
}
| {
    type:"EDIT_ITEM",
    index:number,
    input:t[number],
}
| {
    type:"SET",
    input:t,
} | {
    type: "SET_AUTO_SORT",
    sort_attr?:undefined|k,
    sort_mode?:undefined|"NO_SORT"|"SORT"|"REVERSE"
}

export default function act_arrobj<
t extends object[], 
k extends keyof t[number], 
o extends t[number][k]>
    (prev_arr:ss_arrobj_t<t,k>, action:act_arrobj_t<t,k,o>){
    switch(action.type) { 
        case "SET_AUTO_SORT":{
            return {
                ...prev_arr,
                sort_mode: action.sort_mode,
                sort_attr: action.sort_attr
            } as ss_arrobj_t<t,k>
        }
        case "SORT": { 
            const C_COPY_ARR = [...prev_arr.ss]
            const C_SORT_ARR = oarr.sort_arrobj(
                C_COPY_ARR,
                action.sort_mode ? action.sort_mode : prev_arr.sort_mode,
                action.sort_attr ? action.sort_attr : prev_arr.sort_attr
            )
            return {
                ...prev_arr,
                ss:C_SORT_ARR
            } as ss_arrobj_t<t,k>
        } 
        case "EDIT_ITEM": { 
            const C_COPY_ARR = [...prev_arr.ss]
            const C_UPDATE = oarr.edit_item(
                C_COPY_ARR,
                action.index,
                action.input
            )
            const C_SORT_ARR = oarr.sort_arrobj(
                C_UPDATE,
                prev_arr.sort_mode,
                prev_arr.sort_attr
            )
            return {
                ...prev_arr,
                ss:C_SORT_ARR
            } as ss_arrobj_t<t,k>
        } 
        case "EDIT_ATTR": { 
            const C_COPY_ARR = [...prev_arr.ss]
            const C_UPDATE = oarr.edit_attr(
                C_COPY_ARR,
                action.index,
                action.input,
                action.attr,
            )
            const C_SORT_ARR = oarr.sort_arrobj(
                C_UPDATE,
                prev_arr.sort_mode,
                prev_arr.sort_attr
            )
            return {
                ...prev_arr,
                ss:C_SORT_ARR
            } as ss_arrobj_t<t,k>
        } 
        case "PUSH": { 
            const C_COPY_ARR = [...prev_arr.ss]
            const C_UPDATE = oarr.push_arr(
                C_COPY_ARR,
                action.input
            )
            const C_SORT_ARR = oarr.sort_arrobj(
                C_UPDATE,
                prev_arr.sort_mode,
                prev_arr.sort_attr
            )
            return {
                ...prev_arr,
                ss:C_SORT_ARR
            } as ss_arrobj_t<t,k>
        } 
        case "DELETE": { 
            const C_COPY_ARR = [...prev_arr.ss]
            const C_UPDATE = oarr.delete_item(
                C_COPY_ARR,
                action.index
            )
            const C_SORT_ARR = oarr.sort_arrobj(
                C_UPDATE,
                prev_arr.sort_mode,
                prev_arr.sort_attr
            )
            return {
                ...prev_arr,
                ss:C_SORT_ARR
            } as ss_arrobj_t<t,k>
        } 
        case "SET": {
            const C_COPY_ARR = [...prev_arr.ss]
            const C_SORT_ARR = oarr.sort_arrobj(
                C_COPY_ARR,
                prev_arr.sort_mode,
                prev_arr.sort_attr
            )
            return {
                ...prev_arr,
                ss:C_SORT_ARR
            } as ss_arrobj_t<t,k>
        }
        default: { 
           console.log("--------------------------------------------------------------------")
           console.log("The action.type of act_arrobj is invalid.")
           console.log("The action.type should be \"SORT\"|\"PUSH\"|\"DELETE\"|\"EDIT_ITEM\"|\"EDIT_ATTR\"|\"SET\"")
           console.log("Warning from frontend/ src/ src/ hook/ act_arrobj.tsx/ function reducer")
           console.log("--------------------------------------------------------------------")
           const C_COPY_ARR = [...prev_arr.ss]
           return {
            ...prev_arr,
            ss:C_COPY_ARR
        } as ss_arrobj_t<t,k>
        } 
    }
}

// export function useArr<t extends object[], 
// k extends keyof t[number]>(init:ss_arrobj_t<t,k>){
//     const [ss_arr, setss_arr] = useReducer(act_arrobj, init);
//     return [ss_arr, setss_arr]
// }


export type use_arrobj_t<t extends object[], k extends keyof t[number]> = {
    ss:ss_arrobj_t<t,k>,
    setss: React.ActionDispatch<[action: act_arrobj_t<t, k, t[number][k]>]>
}

export type setss_arrobj_t<
    t extends object[],
    k extends keyof t[number]
> = React.ActionDispatch<[action: act_arrobj_t<t, k, t[number][k]>]>

//-------------------------------------------------------------------------

export type ss_arrname_t<
t extends {name:a.name}[], 
k extends keyof t[number]> = {
    ss:t,
    sort_mode?:undefined|"NO_SORT"|"SORT"|"REVERSE",
    sort_attr?:undefined|k
}

export function act_arrname<
    t extends {name:a.name}[], 
    k extends keyof t[number], 
    o extends t[number][k]>(prev_arr:ss_arrobj_t<t,k>, action:(act_arrobj_t<t,k,o> | {type:"COPY", index:number})){
    switch (action.type){
        case "COPY":{
            const C_COPY_ARR = [...prev_arr.ss]
            const C_UPDATE = oarr.copy_unique_item(
                C_COPY_ARR,
                action.index
            )
            return {
                ...prev_arr,
                ss:C_UPDATE as t
            }
        }
        default: {
            const C_COPY_ARR = [...prev_arr.ss]
            return {
                ...prev_arr,
                ss:C_COPY_ARR
            } as ss_arrobj_t<t,k>
        }
    }
}

export function useArr<t extends {name:a.name}[],
k extends keyof t[number]>(init:ss_arrname_t<t,k>){
    const [ss_arr, setss_arr] = useReducer(act_arrname, init);
    return [ss_arr, setss_arr]
}

export type use_arrname_t<
    t extends {name:a.name}[],
    k extends keyof t[number]> = {
    ss:ss_arrobj_t<t, k>,
    setss:React.ActionDispatch<[action: {
        type: "COPY";
        index: number;
    } | act_arrobj_t<t, k, t[number][k]>]>
}

export type setss_arrname_t<
    t extends {name:a.name}[],
    k extends keyof t[number]
> = React.ActionDispatch<[action: {
    type: "COPY";
    index: number;
} | act_arrobj_t<t, k, t[number][k]>]>
