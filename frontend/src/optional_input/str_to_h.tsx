import React from "react"

export default function Str_to_h(
{
    title
}:{
    title:string|undefined
}
){
    if (title != undefined)
    {
        return (<h1>{title}</h1>)
    }
    return (<></>)
}
