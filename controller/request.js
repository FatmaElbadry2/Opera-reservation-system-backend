const express = require('express');
const router = express.Router();
const env=require("../config/env");
const jwt=require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const passport = require('passport');
const Roles=require("../config/passport").Roles
const requests=require("../models/request")
const requestservices=require("../services/request")
const userservices=require("../services/user")



router.post('/createRequest',passport.authenticate('jwt',{session:false}),(req,res)=>{

    let request={
        UserId:req.user.dataValues.id,
        role:req.body.role,
        status:0
    };
    requestservices.createRequest(request.UserId,request.role,found=>{
        res.json(found)
    });
    // requests.create(request).then(returned=>{
    //     res.json(returned);
    // }).catch(err=>{
    //     err.errors
    // });    
});


router.get('/getAllRequests',passport.authenticate('jwt',{session:false}),Roles([0]),(req,res)=>{ 
    requests.findAll({where:{status:0}}).then(request=>{
        return res.json(request)
    })
    
});


router.post('/respond',passport.authenticate('jwt',{session:false}),Roles([0]),(req,res)=>{
    let request={
        status:req.body.status,
        userId:req.body.UserId
    };

    requestservices.editstatus(request.status,request.userId,(request)=>{

        if ( request.status==1){  //accepted
            
            userservices.updateAuthority(request.UserId,request.role,(user)=>{
                return res.json(user)
            })
        }
        else{  //rejected
            return res.json({
                message: "request rejected"
            })
        }

    });
    

    
});






module.exports=router;