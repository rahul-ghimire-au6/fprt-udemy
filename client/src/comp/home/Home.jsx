import React from 'react'
import { connect } from 'react-redux'
import HomeClient from './HomeClient'
import HomeUploader from './HomeUploader'
import { Redirect } from 'react-router'
import { checkLogin } from '../../redux/action/action'

function Home({user}) {
    
    return (
        <div>
            {
                user.loggedIn===true?
                user.admin!==null?
                user.admin===false?<HomeClient />:
                <HomeUploader />:null:
                <Redirect to='/login' />
            }
        </div>
    )
}
const mapDispatch = dispatch =>{
    return {
        checkLogin:()=>dispatch(checkLogin())
    }
}

export default connect(state=>{return {...state}}, mapDispatch)(Home)
