import React, { useState } from 'react'
import './App.css';
import { Link, Redirect } from "react-router-dom"
import { signup } from './helper/auth';

const Signup = ()=> {

    const [values, setValues] = useState({
        name:"",
        email: "",
        password:"",
        repassword:"",
        error:"",
        success: false
    })
    
    const { name, email, password, repassword,error, success} = values

    
    
    const handleChange = name => event => {
        setValues({...values, error:false, [name]: event.target.value})
    }
    
    const onSubmit = event =>{
        event.preventDefault();
        setValues({...values, error:false})
        signup({name, email, password, repassword})
       
        .then(data => {
            if(data.error){
                setValues({...values, error:data.error, success: false})
               
            }
            else{
              
                setValues({
                    ...values,
                    name:"",
                    email:"",
                    password:"",
                    repassword:"",
                    error:"",
                    success: true
                })
              
            }
           
           
        })
        .catch((error) => console.log(error))
    }

    
    const signUpForm = () =>{
        return (
            <div className="App">
            <h1>Signin</h1>
            <form >
            <input type="text" placeholder="Name" 
            onChange = {handleChange("name")}
            type="text"
            value={name} />
            <input type="email" placeholder="Email" 
            onChange = {handleChange("email")}
            type="text"
            value={email} />
            <input type="password" placeholder="Password"
            onChange = {handleChange("password")}
            type="text"
            value={password}  />
            
            <input type="password" placeholder="Retype Password" 
            onChange = {handleChange("repassword")}
            type="text"
            value={repassword} />
            <button onClick={onSubmit}>Submit</button>

            </form>
            
        </div>
        )
    }
    const successMessage = () => {
        return (
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left pop">
              <div
                className="alert alert-success"
                style={{ display: success ? "" : "none" }}
              >
                New account was created successfully. Please{" "}
                <Link to="/">Login Here</Link>
              </div>
            </div>
          </div>
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
    
    return (
        <div>
        {successMessage()}
        {errorMessage()}
          {signUpForm()}
         
        </div>
    )
}

export default Signup