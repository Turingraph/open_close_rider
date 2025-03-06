//-------------------------------------------------------------------------

// TYPE : "SORT"

export type sort_t<t extends object, k extends keyof t> = {
    attr:k,
    mode:"NO_SORT"|"SORT"|"REVERSE"
}

export function sort_arr<t extends object, k extends keyof t>(
    arr:t[],
    sort:sort_t<t,k>|undefined
){
    // https://stackoverflow.com/questions/21687907/
    // typescript-sorting-an-array

    // https://stackoverflow.com/questions/26871106/
    // check-if-all-elements-in-array-are-strings

    if(sort === undefined){
        return arr
    }
    switch(sort.mode){
        case "SORT":{
            return arr.sort((n0, n1) => n0[sort.attr] < n1[sort.attr] ? -1 : 1)
        }
        case "REVERSE":{
            return arr.sort((n0, n1) => n0[sort.attr] > n1[sort.attr] ? -1 : 1)
        }
        case "NO_SORT":{
            return arr
        }
        default:{
            console.log("--------------------------------------------------------------------")
            console.log("The sort.mode of sort_arr is invalid.")
            console.log("The action.type should be \"SORT\"|\"REVERSE\"|\"NO_SORT\"")
            console.log("Warning from frontend/ src/ src/ hook/ funcObjArr.tsx/ function sort_arr")
            console.log("--------------------------------------------------------------------")
            return arr
        }
        }
    }

//-------------------------------------------------------------------------

// TYPE : "EDIT_ITEM"

export function edit_item<t extends object>(
    arr:t[],
    index:number,
    input:t
){
const UPDATE_ARR = [...arr]
if(index >= 0 && index < UPDATE_ARR.length){
    UPDATE_ARR[index] = input
}
return UPDATE_ARR
}

//-------------------------------------------------------------------------

// TYPE : "EDIT_ATTR"

export function edit_attr<
    t extends object, 
    k extends keyof t,
    v extends t[k]>(
        arr:t[],
        index:number,
        input:v,
        attr:k,
    ){
    const UPDATE_ARR = [...arr]
    if(index >= 0 && index < UPDATE_ARR.length){
        UPDATE_ARR[index][attr] = input
    }
    return UPDATE_ARR
}

//-------------------------------------------------------------------------

// TYPE : "PUSH"

export function push_arr<t extends object>(
    arr:t[],
    input:t,
){
    const UPDATE_ARR = [...arr]
    UPDATE_ARR.push(input)
    return UPDATE_ARR
}

//-------------------------------------------------------------------------

// TYPE : "DELETE"

export function delete_item<t>(arr:t[], index:number){
    if(index >= 0 && index <= arr.length){
        const UPDATE_ARR = [...arr]
        UPDATE_ARR.splice(index, 1)
        return UPDATE_ARR
    }
    return arr
}
