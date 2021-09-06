const express = require('express');
const router = express.Router();
const RentVehicle = require('../models/rentvehicle');
const {check,validationResult} = require('express-validator'); 
const { route } = require('./rentvehicle');
const authCustomer = require("../middleware/customerAuthentication")

router.post('/vehicle/rent',authCustomer.verifyMain, function(req,res){
     
    const errors = validationResult(req)
    
    if (errors.isEmpty()){
         //console.log(req.body)
         const rentername = req.customer.name
         const vehicletype = req.body.vehicletype
         const rentindate = req.body.rentindate
         const rentoutdate = req.body.rentoutdate
         const rentaltime = req.body.rentaltime
         const deliverylocation = req.body.deliverylocation
         const rate = req.body.rate
         const total = req.body.total

          const rentvehicle = new RentVehicle({rentername:rentername,vehicletype:vehicletype,rentindate:rentindate,rentoutdate:rentoutdate,rentaltime:rentaltime,deliverylocation:deliverylocation,rate:rate,total:total})
          rentvehicle.save()
         .then(function(result){
                   //success
                   console.log('vehicle rented')
                   res.status(201).json({success : true ,data:result});

          })
         .catch(function (error){
              console.log('vehicle add error',error.message)
                res.status(500).json({errorMessage: error});
          })
              

    }
    else{
         res.status(400).json(errors.array())
    }  
})

module.exports = router 