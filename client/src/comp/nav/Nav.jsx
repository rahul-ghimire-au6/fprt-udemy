import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import { doLogout } from '../../redux/action/action';

function Nav({user,doLogout}) {
    return (
        <nav className='navbar navbar-expand-sm bg-light'>
            <Link to='/' className="navbar-brand" style={{color:'black'}}>Udemy</Link>
            <ul className='navbar-nav ml-auto'>
                {
                user.loggedIn===false?
                <li className='nav-item p-2'>
                    <Link to='/login' style={{color:'black',textDecoration:'none'}}>Account</Link>
                </li>:
                <>
                {
                    user.admin===false?
                    <li className='nav-item p-2'>
                        <Link to='/profile' className='nav-link text-primary'>Profile</Link>
                    </li>:
                    null
                }
                <li className='nav-item p-2'>
                    <p 
                    className='nav-link text-primary' 
                    onClick={doLogout} style={{cursor:"pointer"}}>Logout</p>
                </li></>
            }
            </ul>
        </nav>
    )
}
const mapDispatch = dispatch =>{
    return {
        doLogout:()=>dispatch(doLogout())
    }
}
export default connect(state=>{return {...state}}, mapDispatch)(Nav)
