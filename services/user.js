const bcrypt = require('bcryptjs');
const User = require("../models/User");

// Function to encrypt the password
const encryptPass = (newUSer, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUSer.password, salt, (err, hash) => {
            if (err) return err;
            newUSer.password = hash;
            callback(err, newUSer)
        })
    });
};

const registerUser = (user, callback) => {
    encryptPass(user, (err, user) => {
        if(err) throw err;
        User.create(user).then(addedUser => {
            callback(addedUser);
        }).catch(err => {
            callback(err);
        })
    })
};


const updateAuthority=(userid,authority,callback)=>{
    User.findOne({where:{id:userid}}).then(user=>{
        if (user!=null){
        user.update({
        role: authority
      }).then(user=>{callback(user)}).catch(err=>{
          callback(err);
      })
 }
else{
callback({message:"user not found"})
} })
    };

 const removeUser=(name,callback)=>{
     User.findOne({where:{username:name}}).then(user=>{
         if (user !=null){
         user.destroy().then(destroyed=>{
             callback(destroyed)
         }).catch(err=>{
             callback(err)
         });
  }else{
    callback({message:"user not found"})
  } });

 };   


module.exports={registerUser,removeUser,updateAuthority};

//module.exports={removeUser};

//module.exports={updateAuthority};