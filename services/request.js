//import { json } from 'sequelize/types';

const bcrypt = require('bcryptjs');
const request = require("../models/request");


const editstatus=(status,userid,callback)=>{
request.findOne({where:{UserId:userid,status:0}}).then(
    found=>{
        if (found !=null){
        found.update({
            status: status
          }).then(found=>{callback(found)})
          .catch(err=>{
              err.errors
          });
 } 
else{
    callback({message:"request not found"})
}}
)

};

const createRequest=(userid,role,callback)=>{
    request.findAll({where:{UserId:userid,status:0}}).then(found=>{
        if (found.length > 0 ){
            callback({message:"you already have a pending request"})
        }
        else{
            let requests={
                UserId:userid,
                role:role,
                status:0
            }
            request.create(requests).then(returned=>{
                 callback({returned})
            }).catch(err=>{
                err.errors
            });
        }
    })

}

module.exports={editstatus,createRequest};