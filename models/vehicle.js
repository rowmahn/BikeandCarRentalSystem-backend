const mongoose = require('mongoose')

const Vehicle  = mongoose.model('Vehicle',{

    vehicletype:{
        type: String,
        
        enum: ['Bike', 'Car']
    },
    
    vehiclecompany: {
        type: String,
        required: true
    },
    vehiclemodel:{
        type: String,
        required: true
    },
    vehiclenumber: {
        type: String,
        required: true,
        unique: true
    },
    vehicleprice: {
        type: String,
        required: true
    },

    vehicleownercontact:{
        type: String,
        required: true
    },

    vehicleownerid:{
        type: String
    },
    
    vehicleimage:{
        type: String
        
    },
    documentimage:{
        type: String
    }
})
module.exports=Vehicle;