const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const passport = require('passport')
const PORT = 3001
const mainRoutes = require('./routers')


mongoose.connect(process.env.MONGO_DB_URL, (err)=>{
    if(!err){
        console.log("db connect")
        app.listen(PORT, (err)=>{
            if(!err){
                console.log(`server connect ${PORT}`)
            }else{
                console.log("server no connect")
            }
        }) 
    }else{
        console.log("db no connect")
    }
    })


    
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(passport.initialize())
require('./middleware/passport')(passport)
mainRoutes(app)



