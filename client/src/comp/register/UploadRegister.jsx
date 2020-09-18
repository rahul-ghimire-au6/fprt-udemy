import React from 'react'
import Axios from 'axios'
import { useHistory  } from "react-router-dom";

function UploadRegister({state,setState}) {
    let history = useHistory();
    async function register(){
        const {email,pass,name} = state
        const {data} = await Axios.post('http://localhost:5000/uploadregister',{name,email,pass})
        if(data.newuser.email===email){
            history.push('/')
        }
    }

    return (
        <form method='post' onSubmit={e=>e.preventDefault()} className='mt-5'><br/>
            <h2>Admin Registration</h2><br/>
            <input type="text" 
            className='form-control col-10 m-auto' 
            placeholder='Name' value={state.name} 
            onChange={e=>setState({...state,name:e.target.value})}/><br/>
            <input type="email" 
            className='form-control col-10 m-auto' 
            placeholder='Email' value={state.email} 
            onChange={e=>setState({...state,email:e.target.value})}/><br/>
            <input type="password" 
            className='form-control col-10 m-auto' 
            placeholder='Password' value={state.pass} 
            onChange={e=>setState({...state,pass:e.target.value})}/><br/>
            <button onClick={register} 
            className='btn btn-primary'>Submit</button>
        </form>
    )
}

export default UploadRegister
