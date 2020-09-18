import React,{useState} from 'react'
import UploadLogin from './UploadLogin'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

function AdminLogin({user}) {
    const [uploadState,setUpload] = useState({
        name:'',email:'',pass:''
    })
    return (
        <center><div style={{marginTop:'5em',borderRadius:'2em',boxShadow:'0px 0px 10px 10px rgb(0,0,0,0.2)',width:'30em'}}>
            {user.loggedIn===true?<Redirect to='/' />:null}<br/>
            <div className='col-6 p-0 text-center'>
                <UploadLogin state={uploadState} setState={setUpload} /> 
             </div><br/>
            <div className='col-6 p-0 text-center'>
                <Link to='/admin_register'><p>Create Account?</p></Link>
            </div><br/><br/>
        </div></center>
    )
}

export default connect(state=>{return {...state}})(AdminLogin)
