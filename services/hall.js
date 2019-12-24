const bcrypt = require('bcryptjs');
const halls = require("../models/hall");
const seats = require("../models/seats")


const createEvent=(hall,callback)=>{
 halls.create(hall).then(addedhall=>{
    for (i=0;i<addedhall.nrows;i++){
        for (j=0;j<addedhall.ncols;j++){
            let seat={
                number:String(i)+","+String(j),
                hallid:addedhall.id
            }
            seats.create(seat)
        }
    }
}).then(addedhall=>{callback(addedhall)

})
};

module.exports={createEvent};