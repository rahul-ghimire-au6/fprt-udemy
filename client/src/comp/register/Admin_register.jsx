import React,{useState} from 'react'
// import ClientRegister from './ClientRegister'
import UploadRegister from './UploadRegister'
import { Link } from 'react-router-dom'

function AdminRegister() {
    const [uploadState,setUpload] = useState({
        name:'',email:'',pass:''
    })
    return (
        <center><div style={{marginTop:'5em',borderRadius:'2em',boxShadow:'0px 0px 10px 10px rgb(0,0,0,0.2)',width:'40em'}}>
            <div className='col-6 p-0 text-center'>
                <UploadRegister state={uploadState} setState={setUpload} />
            </div>
            <div className='col-6 pt-4 text-center'>
                <Link to='/admin_login'><p>Already have an account ? Click to Login</p></Link>
            </div><br/>
        </div></center>
    )
}

export default AdminRegister
