const express = require('express')
const bodyparser= require('body-parser')
const cors = require ('cors')
const { Sequelize, Model, DataTypes } = require('sequelize');
const passport = require('passport');

const Users = require("./models/user")
const Halls=require("./models/hall")
const Event=require("./models/event")
const Seats=require("./models/seats")
const Request =require("./models/request")

const DB = require("./config/database")

DB.authenticate().then(()=>{
    console.log("postgres connected")
   
}).catch((err)=>console.log(err));

//const userservices=require('./services/user')

const userroutes=require('./controller/user')

const hallroutes=require('./controller/hall')
const eventroutes=require('./controller/event')
const requestroutes=require('./controller/request')
const seatsroutes=require('./controller/seats')



const app=express();
app.use(cors());
app.use(bodyparser.json());
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport').Auth(passport);

//app.use(app.router);
//routes.initialize(app);
app.use("/api/users",userroutes);
app.use("/api/events",eventroutes);
app.use("/api/halls",hallroutes);
app.use("/api/request",requestroutes);
app.use("/api/seats",seatsroutes);



DB.sync({force: false});
//Users.sync()

app.get('/',(req,res)=>{
    return res.json({
        message: "whateverrrrrrrr"
    })
})

const port = process.env.PORT || 8080
const server = app.listen(port,()=> 
console.log(`listening to port ${port}...`)
);



module.exports=server;

