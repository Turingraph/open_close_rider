import * as a from "../type/alias";

/*
Rule of every function in this file.
1.  It should takes t[] or a.use_state_t<t[]> as it's input
2.  import * as uarr from ".../utils/utils_arr"
*/

export function sort_arr_attr<t extends object, k extends keyof t>(
    arr:t[],
    attr:k,
    reverse:boolean = false
){
    // https://stackoverflow.com/questions/21687907/
    // typescript-sorting-an-array

    // https://stackoverflow.com/questions/26871106/
    // check-if-all-elements-in-array-are-strings
    if(reverse===true){
        return arr.sort((n0, n1) => n0[attr] > n1[attr] ? -1 : 1)
    }
    return arr.sort((n0, n1) => n0[attr] < n1[attr] ? -1 : 1)
}

export function sort_arr<t>(arr:t[],reverse:boolean = false){
    // https://stackoverflow.com/questions/40472548/
    // typescript-sort-strings-descending
    if(reverse===true){
        return arr.sort((n0, n1) => n0 > n1 ? -1 : 1)
    }
    return arr.sort((n0, n1) => n0 < n1 ? -1 : 1)
}

export function update_item<t>(
        index:number, 
        arr:a.use_state_t<t[]>, 
        update_input:t){
    const UPDATE_ARR = [...arr.ss]
    UPDATE_ARR[index]  = update_input
    arr.setss(UPDATE_ARR)
}

// https://stackoverflow.com/questions/586182/
// https://medium.com/analytics-vidhya/
// 3-ways-to-copy-by-value-any-composite-data-type-in-javascript-ca3c730e4d2f
// export function copy_item<t>(
//     index:number,
//     arr:a.use_state_t<t[]>
// ){
//     const UPDATE_ARR = [...arr.ss]
//     const NEW_OBJ = JSON.parse(JSON.stringify(arr.ss[index]))
//     UPDATE_ARR.splice(index + 1, 0, NEW_OBJ)
//     arr.setss(UPDATE_ARR)
// }

export function copy_unique_item<t extends {name:a.name}>(
    index:number,
    arr:a.use_state_t<t[]>,
    // is_sort:boolean|null = false
){
    let update_arr = [...arr.ss]
    const NEW_OBJ = JSON.parse(JSON.stringify(arr.ss[index]))
    NEW_OBJ.name += "_clone"
    update_arr.splice(index + 1, 0, NEW_OBJ)
    // if(is_sort !== null){
    //     update_arr = sort_arr_attr(update_arr,"name", is_sort)
    // }
    arr.setss(update_arr)
}

// export function copy_ptr_item<t>(
//     index:number,
//     arr:a.use_state_t<t[]>
// ){
//     const UPDATE_ARR = [...arr.ss]
//     const NEW_OBJ = arr.ss[index]
//     UPDATE_ARR.splice(index + 1, 0, NEW_OBJ)
//     arr.setss(UPDATE_ARR)
// }

// export function update_arr<t>(
//         arr:a.use_state_t<t>[],
//         func_event:(e:t)=>void,
//         input:t[]
//     ){
//     arr.map((item, index)=>{
//         item.setss(input[index])
//         func_event(input[index])
//         return item
//     })
// }

export function push_arr<t>(
    input:t,
    arr:a.use_state_t<t[]>,
    // is_sort:boolean|null = false
){
    let update_arr = [...arr.ss]
    update_arr.push(input)
    // if(is_sort !== null){
    //     update_arr = sort_arr(update_arr, is_sort)
    // }
    arr.setss(update_arr)
}

export function push_arr_attr<t extends object>(
    input:t,
    arr:a.use_state_t<t[]>,
    // attr:k,
    // is_sort:boolean|null = false
){
    let update_arr = [...arr.ss]
    update_arr.push(input)
    // if(is_sort !== null){
    //     update_arr = sort_arr_attr(update_arr, attr, is_sort)
    // }
    arr.setss(update_arr)
}

export function delete_item<t>(index:number,arr:a.use_state_t<t[]>){
    const UPDATE_ARR = [...arr.ss]
    UPDATE_ARR.splice(index, 1)
    arr.setss(UPDATE_ARR)
}

export function update_item_attr<
    t extends object, 
    k extends keyof t,
    v extends t[k]>(
        index:number,
        arr:a.use_state_t<t[]>,
        attr:k,
        input:v
    ){
        const UPDATE_ARR = [...arr.ss]
        UPDATE_ARR[index][attr] = input
        arr.setss(UPDATE_ARR)
    }

// export function update_item_attrs<
//     t extends object,
//     k extends keyof t,
//     v extends t[k]>(
//         this_item:number,
//         arr:a.use_state_t<t[]>,
//         attrs:k[],
//         input:v[]
//     ){
//         attrs.map((item, index)=>{
//             update_item_attr(
//                 this_item,
//                 arr,
//                 item,
//                 input[index]
//             )
//             return item
//         })
//     }

// https://stackoverflow.com/questions/70926558/
// filter-wont-filter-undefined
// export function no_undefined<t>(arr:t[]){
//     return arr.filter((item)=> item !== undefined) as t[]
// }

export function exclude_arr<t>(arr_all:t[], arr_exclude:t[]){
    const CONST_ARR_EXLUDE = arr_exclude.map((item)=>{
        return JSON.stringify(item)
    })
    return arr_all.map((item)=>{
        if(CONST_ARR_EXLUDE.includes(JSON.stringify(item)) === false)
        {
            return item
        }
        return undefined
    }).filter((item)=> item !== undefined) as t[]
}

export function include_arr<t>(arr_all:t[], arr_include:t[]){
    const CONST_ARR_INLUDE = arr_include.map((item)=>{
        return JSON.stringify(item)
    })
    return arr_all.map((item)=>{
        if(CONST_ARR_INLUDE.includes(JSON.stringify(item)) === true)
        {
            return item
        }
        return undefined
    }).filter((item)=> item !== undefined) as t[]
}

// export function unique_arr<t>(arr:t[]){
//     // https://stackoverflow.com/questions/36829184/
//     // how-can-i-convert-a-set-to-an-array-in-typescript
//     return Array.from(new Set(arr))
// }
