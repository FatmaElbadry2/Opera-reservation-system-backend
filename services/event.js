const bcrypt = require('bcryptjs');
const events = require("../models/event");
const seats = require("../models/seats")
const halls=require("../models/hall")


const createEvent=(event,callback)=>{

    halls.findOne({where:{number:event.hallnumber}}).then(hall=>{
        event.HallId=hall.id;
        events.create(event).then(added=>{
            for (i=0;i<hall.nrows;i++){
                for (j=0;j<hall.ncols;j++){
                    let seat={
                        number:String(i)+","+String(j),
                        EventId:added.id
                    }
                    seats.create(seat)
                    }
            }   
        }).then(added=>{
            callback(added);
        });

    })
};

module.exports={createEvent};