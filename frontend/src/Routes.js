import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './Home'
import Signin from './Signin'
import Signup from './Signup'


const Routes = () =>{
    return (
        <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Signin} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/dashboard" exact component={Home} />
          


        </Switch>
    </BrowserRouter>
    )
}

export default Routes;