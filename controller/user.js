//import { Roles } from '../config/passport';

const express = require('express');
const router = express.Router();
const userservices=require("../services/user")
const user=require("../models/user");
const env=require("../config/env");
const jwt=require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const passport = require('passport');
const Roles=require("../config/passport").Roles
const requests=require("../models/request")





router.post('/register', (req,res) => {
    let user = {
        username: req.body.username,
        password: req.body.password,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        birthdate:req.body.birthdate,
        gender:req.body.gender,
        city:req.body.city,
        address:req.body.address,
        email:req.body.email
    };
    userservices.registerUser(user, returned => {
        res.json(returned)
    });

});

const getUsersByUsername = (name) => {

     return user.findOne({where: {username: name}})
};

const comparePassword = (password, hash, callback) => {
    bcrypt.compare(password, hash, (err, isMatch) => {
        callback(err, isMatch)
    })
};

router.post('/login', (req,res) => {

    let data = {
        username: req.body.username,
        password: req.body.password
        
    };
   // console.log("from get user",data);
    
   user.findOne({where: {username: data.username}}).then(user => {
       if (user!=null){
        console.log("from get user",user);
        comparePassword(data.password,user.password, (err, isMatched) => {
            console.log("from compare",isMatched);
            if (err) throw err;
            if(isMatched){
                const token = jwt.sign({
                    type: "user",
                    _id: user.id,
                    username: user.username,
                    role: user.role
                },env.secret,
                    {
                        expiresIn: 604800
                    });
                return res.json({
                    token: token,
                    role:user.role
                })
            }else{
                return res.json({
                    message: "Wrong Password"
                })
            }
        })
    }
    else{
        return res.json({
            message:"This user name doesn't exist"
        })
    }}

).catch(err => {
        return res.json(err.errors)
    })

})


router.get('/getAll',passport.authenticate('jwt', {session: false}),Roles([0]), (req,res)=>{
    user.findAll().then(users => {
        return res.json(users)
    }).catch(err=>{
        return res.json(err.errors)
    })
});


router.post('/updateAuthority',passport.authenticate('jwt', {session: false}),Roles([0]), (req,res)=>{
    let data={
        id:req.body.userId,
        role:req.body.authority
    };
    userservices.updateAuthority(data.id,data.role,(user)=>{
        return res.json(user)
    })
   
});

router.post('/deleteAccount',passport.authenticate('jwt', {session: false}),Roles([0]), (req,res)=>{
    let data={
        name:req.body.username
    };
    userservices.removeUser(data.name,(user)=>{
        return res.json({
            message:"deleted successfully"
        })
    })
});


router.get('/getUser',passport.authenticate('jwt', {session: false}), (req,res)=>{
    user.findOne({where:{id:req.user.dataValues.id}}).then(added=>{
        res.json(added)
    })
})

router.post('/updateUser',passport.authenticate('jwt', {session: false}), (req,res)=>{
    let data={
        username: req.body.username,
        password: req.body.password,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        birthdate:req.body.birthdate,
        gender:req.body.gender,
        city:req.body.city,
        address:req.body.address,
        email:req.body.email
    };
   user.findOne({where:{id:req.user.dataValues.id}}).then(found=>{
    found.update({
        username: data.username,
        password: data.password,
        firstname:data.firstname,
        lastname:data.lastname,
        birthdate:data.birthdate,
        gender:data.gender,
        city:data.city,
        address:data.address,
        email:data.email
    }).then(found=>{
        res.json(found)
    })
   })
});


module.exports=router;