import React from 'react'
import Axios from 'axios'
import Spinner from '../home/Spinner'
import { useHistory  } from "react-router-dom";

function ClientRegister({state,setState}) {
    let history = useHistory();
    const [loadign,setLoading] = React.useState(false)
    async function register(){
        setLoading(true)
        try{
            const {name,email,pass} = state
            let data = await Axios.post('http://localhost:5000/clientregister',{name,email,pass})
            // console.log(data)
            if(data.newuser.email===email){
                history.push('/')
            }
        }catch(err){
            console.log(err.message)
        }
        setLoading(false)
    }
    return (
        <form method='post' 
        onSubmit={e=>e.preventDefault()}
        className='mt-5'>
            {loadign===false?
            <><h2>User Registration</h2><br/>
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
            className='btn btn-primary'>Submit</button></>:<Spinner />}
        </form>
    )
}

export default ClientRegister
