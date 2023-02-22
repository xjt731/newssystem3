export const CollApsedReducer = (prevState={
    isCollapsed:false    //初始值 isCollapsed
},action)=>{
    let {type} = action
    switch(type){
        case 'changeCollapsed':
            let newstate ={...prevState}
            newstate.isCollapsed = !newstate.isCollapsed
            return newstate
        default:
            return prevState
    }
    
}