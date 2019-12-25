const express = require('express');
const router = express.Router();
const env=require("../config/env");
const jwt=require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const passport = require('passport');
const ManagerRoles=require("../config/passport").ManagerRoles
const seats=require("../models/seats")
const event=require("../models/event")

router.get('/viewAllSeats',passport.authenticate('jwt',{session:false}),ManagerRoles([2]),(req,res)=>{
    eventid=req.body.eventid;
    seats.findAll({where:{EventId:eventid}}).then(found=>{
        res.json(found)
    })

})

router.get('/viewAvailableSeats',passport.authenticate('jwt',{session:false}),(req,res)=>{
    eventid=req.body.eventid;
    seats.findAll({where:{EventId:eventid,status:false}}).then(found=>{
        res.json(found)
    })
})

router.post('/reserveSeat',passport.authenticate('jwt',{session:false}),(req,res)=>{
    let seat={
        number:req.body.number,
        EventId:req.body.eventid,
        UserId:req.user.dataValues.id
    };
    seats.findOne({where:{number:seat.number,EventId:seat.EventId}}).then(found=>{
        if (found.status){
             res.json({
                message:"this seat is already reserved"
            })
        }
        else{
            found.update({
                status:true,
                UserId:seat.UserId
            }).then(reserved=>{
                res.json(reserved)
            })
        }
        
    })
});


router.get('/viewMyReservations',passport.authenticate('jwt',{session:false}),(req,res)=>{
    eventid=req.body.eventid;
    seats.findAll({where:{EventId:eventid,status:true,UserId:req.user.dataValues.id}}).then(myseats=>{
        res.json(myseats)
    });
});



router.get('/viewMyEvents',passport.authenticate('jwt',{session:false}),(req,res)=>{
    
    seats.findAll({where:{status:true,UserId:req.user.dataValues.id}}).then(myseats=>{
        myevents=[]
        for (var x in myseats){
            //console.log(myseats[x])
            event.findOne({where:{id:myseats[x].EventId}}).then(found=>{
                myevents.push(found); 
            })
                
        }

        uniqueEvents=Array.from(new Set (myevents))
        console.log("plaeeeese",myevents);

        res.json({events:uniqueEvents,seats:myseats})
    });
});




router.post('/cancelReservation',passport.authenticate('jwt',{session:false}),(req,res)=>{
    let seat={
        number:req.body.number,
        EventId:req.body.eventid,
        UserId:req.user.dataValues.id
    };
    seats.findOne({where:{number:seat.number,EventId:seat.EventId,UserId:seat.UserId}}).then(found=>{
            found.update({
                status:false,
                UserId:null
            }).then(reserved=>{
                res.json(reserved)
            })
 
    })
});



module.exports=router;