const mongoose = require('mongoose')

const RentVehicle  = mongoose.model('RentVehicle',{

    rentername:{
        type: String
    },
    vehicletype:{
        type: String,
        enum: ['Bike', 'Car']
    },
    rentindate: {
        type: String
    },
    rentoutdate: {
        type: String
    },
    rentaltime:{
        type: String
    },
    deliverylocation:{
        type: String
    },
    rate: {
        type: String
    },
    total:{
        type: String
    }



})
module.exports=RentVehicle;