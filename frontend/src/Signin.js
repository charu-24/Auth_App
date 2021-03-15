import React, { useState } from 'react'
import './App.css';
import { Link, Redirect } from "react-router-dom"
import { isAutheticated ,authenticate, signout, signin} from './helper/auth';
const Signin = () => {

    const [values, setValues] = useState({
        email:"",
        password:"",
        error:"",
        loading:false,
        didRedirect:false
    })
    const {email, password, error, loading, didRedirect} = values

    const { user } = isAutheticated()


    const handleChange = name => event => {
        setValues({...values, error:false, [name]: event.target.value})
    }

    const onSubmit = event => {
        event.preventDefault()
        setValues({...values, error: false, loading:true})

        signin({email,password})
        .then(data => {
            if(data.error) {
                console.log("hello")
                setValues({...values, error:data.error, email:"",
                password:"",loading: false})
            }else{
                authenticate(data, () => {
                    setValues({
                        ...values,
                
                        didRedirect:true,

                    })
                })
            }
        })
        .catch(error => console.log("error in siginin"))
    }

    const performRedirect = () => {


        if(didRedirect){
            if( user ){
           
                return <Redirect to="/dashboard" />
            }
        }
        if(isAutheticated()){
            return <Redirect to="/" />
        }
    }

    const signinform = () => {
        return (
            <div className="App">
            <h1>Signin</h1>
            <form >
           
            <input type="email" placeholder="Email" 
            onChange = {handleChange("email")}
            type="text"
            value={email} />
            <input type="password" placeholder="Password"
            onChange = {handleChange("password")}
            type="text"
            value={password}  />
         
            <button onClick={onSubmit}>Submit</button>

            </form>
            <h2>New User?<Link to="/signup" ><span>Signup</span></Link></h2>
        </div>
        )
}

const loadingMessage = () => {
    return (
      loading && (
          <div className="alert alert-info">
            <h1>Loading...</h1>
          </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };



    return(
        <div>
        {errorMessage()}
        {signinform()}
        {performRedirect()}
        </div>
    )
}

export default Signin
