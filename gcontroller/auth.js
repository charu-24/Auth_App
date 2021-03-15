const User = require("../models/user");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validationResult, clearCookie } = require("express-validator")
const expressJwt = require('express-jwt')



exports.signup = (req, res) =>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }
    const {name, email, password, repassword} = req.body
    User.findOne({email},(err, user) =>{
        if(user==null){
            const user = new User(req.body)
           
        bcrypt.genSalt(10, (err, salt) => bcrypt.hash(user.password, salt, (err, hash)=>{
            if(err) throw err;
            console.log(hash)
            user.password = hash
            user.repassword=hash

            user.save((err, user) =>{
                if(err)
                {
                    res.status(400).json({
                        err:"Not able to ave user"
                    })
                }
                res.json({
                    name:name,
                    email:email,
                    password:password
                })
            })
        }))
    }
    else{
        res.json({
            msg:"User already exist"
        })
    }
    })
    .catch(err => console.log(err))

}

exports.signin = (req, res)=>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        res.status(422).json({
            error: error.array()[0].msg
        })
    }
    const {email, password} = req.body
    User.findOne({email:email}, (err, user)=>{
        if(err){
            res.status(400).json({
                err:err
            })
        }
        if(user<1){
            res.status(400).json({
                msg:"User doesn't exit"
            })
        }
        else{
            bcrypt.compare(password,user.password,(err, result)=>{
                if(err){
                    return res.status(404).json({
                        msg:err
                    })
                }
                if(result==true){
                    const token = jwt.sign(user.name, process.env.SECRET);
                    res.cookie("token", token, { expire: new Date() + 9999 });

    //send response to front end
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
                }
            })
        }
    })
}
exports.signout = (req, res)=>{
    res.clearCookie("token")
    res.json({
        msg: "User Signout"
    })
}



