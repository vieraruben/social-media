import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './components/core/Home'
import Users from './components/user/Users'
import Signup from './components/user/Signup'
import Signin from './components/auth/Signin'
import EditProfile from './components/user/EditProfile'
import Profile from './components/user/Profile'
import PrivateRoute from './components/auth/PrivateRoute'
import Menu from './components/core/Menu'

const MainRouter = () => {
    return (<div>
      <Menu/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/users" component={Users}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/signin" component={Signin}/>
        <PrivateRoute path="/user/edit/:userId" component={EditProfile}/>
        <Route path="/user/:userId" component={Profile}/>
      </Switch>
    </div>)
}

export default MainRouter
