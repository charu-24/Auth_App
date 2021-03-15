const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const cors = require("cors")
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

//My route
const authRouter = require('./routes/auth')
const app = express()


//monodb connection
mongoose.connect(process.env.MONGODB,{ useNewUrlParser: true, useUnifiedTopology: true }, (err, res)=>{
    if(err) throw err;
    else{
        console.log("DB Connected")
    }
})

//Middleware
app.use(express.json())
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

//my routes
app.use("/api", authRouter)

//PORT
const port  = process.env.PORT || 3000


app.listen(port, ()=>{
    console.log("server running")
})