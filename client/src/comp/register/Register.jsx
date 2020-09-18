import React,{useState} from 'react'
import ClientRegister from './ClientRegister'
import { Link } from 'react-router-dom'

function Register() {
    const [clientState,setClient] = useState({
        name:'',email:'',pass:''
    })
    return (
        <center><div style={{marginTop:'5em',borderRadius:'2em',boxShadow:'0px 0px 10px 10px rgb(0,0,0,0.2)',width:'40em'}}>
            <div className='col-6 p-0 text-center'><br/>
                <ClientRegister state={clientState} setState={setClient} />
            </div>  
            <div className='col-6 pt-4 text-center'>
                <Link to='/login'><p>Already have an account ? Click to Login</p></Link>
            </div>
            <div className='col-6 text-center'>
                <p>or</p>
            </div>
            <div className='col-6 text-center'>
                <Link to='/admin_register'><p>Click here for Admin Login</p></Link>
            </div><br/>
        </div></center>
    )
}

export default Register
