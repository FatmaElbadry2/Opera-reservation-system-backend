const express = require('express');
const multer  = require('multer');
const router = express.Router();
const env=require("../config/env");
const jwt=require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const passport = require('passport');
const ManagerRoles=require("../config/passport").ManagerRoles
const event=require("../models/event")
const eventservices=require("../services/event")

router.post('/createEvent',passport.authenticate('jwt',{session:false}),ManagerRoles([2]),(req,res)=>{

    let event={
        name:req.body.name,
        description:req.body.description,
        date:req.body.date,
        starttime:req.body.starttime,
        endtime:req.body.endtime,
        hallnumber:req.body.hallnumber
        
    };
    eventservices.createEvent(event,(addedevent)=>{
        res.json(
            addedevent)
    })      
});


router.get('/getAllEvents',(req,res)=>{
    event.findAll().then(events=>{
        res.json(events)
    })
})

module.exports=router;