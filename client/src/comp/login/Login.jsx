import React,{useState} from 'react'
import ClientLogin from './ClientLogin'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

function Login({user}) {
    const [clientState,setClient] = useState({
        name:'',email:'',pass:''
    })
    return (
        <center><div style={{marginTop:'5em',borderRadius:'2em',boxShadow:'0px 0px 10px 10px rgb(0,0,0,0.2)',width:'30em'}}>
            {user.loggedIn===true?<Redirect to='/' />:null}<br/>
            <div className='col-6 p-0 text-center'>
                <ClientLogin state={clientState} setState={setClient} />
            </div><br/>
            <div className='col-6 p-0 text-center'>
                <Link to='/register'><p>Create Account?</p></Link>
            </div><br/><br/>
        </div></center>
    )
}

export default connect(state=>{return {...state}})(Login)
