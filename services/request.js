const bcrypt = require('bcryptjs');
const request = require("../models/request");


const editstatus=(status,userid,callback)=>{
request.findOne({where:{UserId:userid}}).then(
    found=>{
        found.update({
            status: status
          }).then(found=>{callback(found)});
    }
)


};

module.exports={editstatus};