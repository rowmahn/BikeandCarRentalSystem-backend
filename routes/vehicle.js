const express = require('express');
const router = express.Router();

const Vehicle = require('../models/vehicle');
const {check,validationResult} = require('express-validator'); 
const { route } = require('./vehicle');
const authCustomer = require("../middleware/customerAuthentication")

const upload = require('../middleware/upload');



//Register Route for Vehicle

router.post('/vehicle/insert', function(req,res){
     
     const errors = validationResult(req)
     
     if (errors.isEmpty()){
          //console.log(req.body)
          const vehicletype = req.body.vehicletype
          const vehiclecompany = req.body.vehiclecompany
          const vehiclemodel = req.body.vehiclemodel
          const vehiclenumber = req.body.vehiclenumber
          const vehicleprice = req.body.vehicleprice
          const vehicleownercontact = req.body.vehicleownercontact
          const vehicleownerid = req.body.vehicleownerid

           const vehicleInsert = new Vehicle({vehicletype:vehicletype,vehiclecompany:vehiclecompany,vehiclemodel:vehiclemodel,vehiclenumber:vehiclenumber,vehicleprice:vehicleprice,vehicleownercontact:vehicleownercontact,vehicleownerid:vehicleownerid})
           vehicleInsert.save()
          .then(function(result){
                    //success
                    //console.log('vehicle added')
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