import React, {useEffect} from 'react'
import {BrowserRouter as Router, Switch,Route,Redirect} from 'react-router-dom'
import Home from './comp/home/Home'
import Register from './comp/register/Register'
import AdminRegister from './comp/register/Admin_register'
import AdminLogin from './comp/login/admin_login'
import Login from './comp/login/Login'
import { connect } from 'react-redux'
import { checkLogin } from './redux/action/action'
import Nav from './comp/nav/Nav'
import Profile from './comp/profile/Profile'

function App({checkLogin,user}) {
  useEffect(()=>{
    checkLogin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <div>
      <Router>
        <Nav />
        <Switch>
          <Route exact path='/' component={Home}/> 
          <Route exact path='/register' component={Register}/> 
          <Route exact path='/admin_register' component={AdminRegister}/> 
          <Route exact path='/admin_login' component={AdminLogin}/> 
          <Route exact path='/login' component={Login}/> 
          <Route exact path='/profile' component={Profile}/> 
        </Switch>
      </Router>
    </div>
  )
}
const mapDispatch = dispatch =>{
  return {
    checkLogin:()=>dispatch(checkLogin())
  }
}
export default connect(state=>{return {...state}},mapDispatch)(App)


