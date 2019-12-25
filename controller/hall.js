//import { ManagerRoles } from '../config/passport';

const express = require('express');
const router = express.Router();

const env=require("../config/env");
const jwt=require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const passport = require('passport');
const ManagerRoles=require("../config/passport").ManagerRoles
const halls=require("../models/hall")
//const requestservices=require("../services/request")
const userservices=require("../services/user")
const hallservices=require("../services/hall")



router.post('/createHall',passport.authenticate('jwt',{session:false}),ManagerRoles([2]),(req,res)=>{

    let hall={
        number:req.body.number,
        nrows:req.body.rows,
        ncols:req.body.cols
    };
    
    halls.create(hall).then(added=>{
        res.json(hall)
    }).catch(err=>{
        res.json(err)
    })
   
});


router.get('/getHalls',passport.authenticate('jwt',{session:false}),ManagerRoles([2]),(req,res)=>{
    halls.findAll().then(halls=>{
        res.json(halls)
    })
})







module.exports=router;