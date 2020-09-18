import Axios from 'axios'
export const CHECK_LOGIN = 'CHECK_LOGIN'
export const DO_LOGIN = 'DO_LOGIN'
export const DO_LOGOUT = 'DO_LOGOUT'
export const GET_MY_VIDEO = 'GET_MY_VIDEO'
export const GET_ALL_VIDEO = 'GET_ALL_VIDEO'
export const GET_MY_LIST = 'GET_MY_LIST'

export const base = 'http://localhost:5000'

export const checkLogin = ()=>async dispatch =>{
    try{
        const token = localStorage.getItem("token")
        if(token!==null){
            const data = await Axios.post(`${base}/checklogin`,{token})
            if(data.status===200){
                if(data.data.message.admin==='true'){
                    return dispatch({type:CHECK_LOGIN, payload:true})
                }else{
                    return dispatch({type:CHECK_LOGIN,payload:false})
                }
            }
            return dispatch({type:DO_LOGOUT})
        }
    }catch(err){
        console.log(err.message)
    }
}

export const doLogout = () =>async dispatch =>{
    localStorage.removeItem("token")
    return dispatch({type:DO_LOGOUT})
}

export const doLogin = payload => dispatch =>{
    console.log("do login called")
    localStorage.setItem("token",payload.token)
    let admin = payload.admin==="true"?true:false
    return dispatch({type:DO_LOGIN,payload:admin})
}

export const getMyVideo = () => async dispatch =>{
    try{
        const token=  localStorage.getItem("token")
        const {data} = await Axios.post(`${base}/getmyvideo`,{token})
        return dispatch({type:GET_MY_VIDEO,payload:data.videos})
    }catch(err){
        console.log(err.message)
    }
    
}

export const getAllVideo = ()=> async dispatch =>{
    try{
        const {data} = await Axios.post(`${base}/getallvideo`)
        return dispatch({
            type:GET_ALL_VIDEO,
            payload:data.data
        })
    }catch(err){
        console.log(err.message)
    }
}

export const getMyList = () => async dispatch =>{
    try{
        const {data} = await Axios.post(`${base}/getmylist`,{token:localStorage.getItem("token")})
        return dispatch({type:GET_MY_LIST,payload:data.orders})
    }catch(err){
        console.log(err.message)
    }
}