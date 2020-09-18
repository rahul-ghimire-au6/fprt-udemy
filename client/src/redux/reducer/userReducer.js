import { CHECK_LOGIN, DO_LOGIN, 
        DO_LOGOUT, GET_MY_VIDEO, 
        GET_ALL_VIDEO, GET_MY_LIST } from "../action/action"

const initState = {
    loggedIn:false,
    admin:null,
    videos:null,
    allvideos:null,
    mylist:null
}

function userReducer (state=initState,action){
    const {type,payload} = action
    switch(type){
        case CHECK_LOGIN:return {...state,loggedIn:true,admin:payload}
        case DO_LOGIN:return {...state,loggedIn:true,admin:payload}
        case DO_LOGOUT:return {...state,loggedIn:false}
        case GET_MY_VIDEO:return {...state,videos:payload}
        case GET_ALL_VIDEO:return {...state,allvideos:payload}
        case GET_MY_LIST:return {...state,mylist:payload}
        default:return {...state}
    }
}
export default userReducer