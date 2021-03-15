const express= require('express')
const { check, validationResult } = require('express-validator')
const { signup, signin, signout } = require('../gcontroller/auth')
const router = express.Router()

router.get('/', (req, res)=>{
    res.send("hey buddy ji")
})

router.post('/signin', [
    check("email", "email is required").isEmail(),
    check("password", "password field is required").isLength({ min: 1 })
  ], signin)

router.post('/signup',  [
    check("name", "Name should be at least 3 char").isLength({ min: 3 }),
    check("email", "Email is required").isEmail(),
    check("password", "Password should be at least 6 char").isLength({ min: 6 }),
    check("repassword", "Please Retypr your password").isLength({ min: 6 })
    
], signup)

router.get("/signout", signout)
module.exports = router