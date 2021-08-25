const mongoose = require('mongoose')


const Customer = mongoose.model('Customer',{
    customertype:{
        type: String,
        required: true,
        enum: ['Renter','Owner','Admin']
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },

    citizenshipnumber:{
        type: String,
        required: true,
        unique: true
    },
    licencenumber:{
        type: String,
        required: true,
        unique: true
    },
    
    email:{
        type: String,
        required: true,
        unique: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    profileimage:{
        type: String,
        default: "images/profile.jpeg"
    },
    licenceimage:{
        type: String
    }
    
})
module.exports=Customer;