import React, { useState } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom';

import './App.css';
import { signout } from './helper/auth';

const Home = () => {
    const history = useHistory()
   
  

    return(
        <div className="Home">
            <h1>Welcome to the Dashboard</h1>
            <button onClick={()=>{
                signout();
                history.push('/')
            }}>Signout</button>
        </div>
    )
}

export default Home
