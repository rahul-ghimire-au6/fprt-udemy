import React from 'react'
import Axios from 'axios'
import {connect} from 'react-redux'
import { doLogin } from '../../redux/action/action'

function UploadLogin({state,setState,doLogin, user}) {
    async function login(){
        const {email,pass} = state
        const data = await Axios.post('http://localhost:5000/uploaderlogin',{
            email,pass})
            console.log(data.data)
        if(data.status===200){
            return doLogin({token:data.data.token,admin:data.data.admin})
        }else{
            alert("login failed")
        }
        if(data.status===200){
            this.props.history.push('/')
        }
    }

    return (
        <form method='post' onSubmit={e=>e.preventDefault()}className='mt-5'>
            <h2>Admin Login</h2><br/>
            <input type="email" 
            className='form-control col-10 m-auto' 
            placeholder='Email' value={state.email} 
            onChange={e=>setState({...state,email:e.target.value})}/><br/>
            <input type="password" 
            className='form-control col-10 m-auto' 
            placeholder='Password' value={state.pass} 
            onChange={e=>setState({...state,pass:e.target.value})}/><br/>
            <button onClick={login} 
            className='btn btn-primary'>Submit</button>
        </form>
    )
}

const mapDispatch = dispatch =>{
    return {
        doLogin:payload=>dispatch(doLogin(payload))
    }
}
export default connect(state=>{return {...state}},mapDispatch)(UploadLogin)
