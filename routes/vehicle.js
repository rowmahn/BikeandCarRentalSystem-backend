const express = require('express');
const router = express.Router();

const Vehicle = require('../models/vehicle');
const { check, validationResult } = require('express-validator');
const { route } = require('./vehicle');
const authCustomer = require("../middleware/customerAuthentication")

const upload = require('../middleware/upload');



//Register Route for Vehicle

router.post('/vehicle/add',upload.single('vehicleimage'), function(req,res){
     //  console.log(req.file.path)
       if(req.file == undefined){
           return res.status(400).json({message : "Invalid file format"});
       }
       const vehicletype = req.body.vehicletype
       const vehiclecompany = req.body.vehiclecompany
       const vehiclemodel = req.body.vehiclemodel
       const vehiclenumber = req.body.vehiclenumber
       const vehicleprice = req.body.vehicleprice
       const vehicleownercontact = req.body.vehicleownercontact
       const vehicleownerid = req.body.vehicleownerid
       const vehicleimage = req.file.filename
      
       const vehicleadd = new Vehicle({vehicletype:vehicletype,vehiclecompany:vehiclecompany,vehiclemodel:vehiclemodel,vehiclenumber:vehiclenumber,vehicleprice:vehicleprice,vehicleownercontact:vehicleownercontact,vehicleownerid:vehicleownerid,vehicleimage:vehicleimage})
        vehicleadd.save()
        .then(function(result){
            res.status(201).json({message : "Vehicle Added!!!!"})
        })
        .catch(function(e){
            res.status(500).json({error : e, message: "Vehicle not Added!!!"})
        })
      
     })

router.get('/vehicle/fetchByType/:vehicletype', function (req, res) {
     vehicletype = req.params.vehicletype
     Vehicle.find({ vehicletype: vehicletype })
          .then(function (vehicleData) {

               res.status(200).json({ success: true, data: vehicleData })

          })
          .catch(function (err) {
               res.status(500).json({ errorMessage: err })
          })
})

router.get('/vehicle/fetch/:id', function (req, res) {

     Vehicle.find({ vehicleownerid: req.params.id }).then(function (vehicleData) {

          res.status(200).json({ success: true, count: vehicleData.length, data: vehicleData })
     })
})

//Single vehicle fetch

router.get('/vehicle/single/:id', function (req, res) {

     const id = req.params.id

     Vehicle.findOne({ _id: id })
          .then(function (vehicleData) {

               res.status(200).json({ success: true, data: vehicleData })
               // console.log(vehicleData)
          })
          .catch(function (err) {
               res.status(500).json({ errorMessage: err })
          })
})

router.delete('/vehicle/delete/:vehicleid', function (req, res) {
     const vehicleid = req.params.vehicleid

     Vehicle.deleteOne({ _id: vehicleid })
          .then(function (result) {
               res.status(200).json({ success: true, data: result, message: "Vehicle Deleted Successfully" })
               //console.log("hittedd")
          })
          .catch(function (err) {
               res.status(500).json({ errorMessage: err })
          })
})

//vehicle update

router.put('/vehicle/update/:id', function (req, res) {
     console.log(req.body)
     const vehicletype = req.body.vehicletype
     const vehiclecompany = req.body.vehiclecompany
     const vehiclemodel = req.body.vehiclemodel
     const vehicleprice = req.body.vehicleprice
     const vehiclenumber = req.body.vehiclenumber
     const vehicleownercontact = req.body.vehicleownercontact
     const vehicleid = req.params.id
     //const vehicleimage = req.file.path

     Vehicle.findByIdAndUpdate({ _id: vehicleid }, { vehicletype: vehicletype, vehiclecompany: vehiclecompany, vehiclemodel: vehiclemodel, vehicleprice: vehicleprice, vehiclenumber: vehiclenumber, vehicleownercontact: vehicleownercontact })
          .then(function (result) {
               res.status(200).json({ message: "Updated Successfully!!!", data: result })
               //console.log("route hitted")
          })
          .catch(function (err) {
               res.status(500).json({ errorMessage: err })
          })

})
router.put('/vehicle/rented/:id', function (req, res) {
     console.log(req.body)

     Vehicle.findByIdAndUpdate({ _id: vehicleid }, { rented: true })
          .then(function (result) {
               res.status(200).json({ success: true, successMessage: "Rented Successfully!!!", data: result })
               //console.log("route hitted")
          })
          .catch(function (err) {
               res.status(500).json({ errorMessage: err })
          })

})

//vehicle delete

router.delete('/vehicle/delete/:vehicleid',function(req,res){
     const vehicleid = req.params.vehicleid
     
     Vehicle.deleteOne({_id : vehicleid})
     .then(function(result){
          res.status(200).json({success: true,data:result,message: "Vehicle Deleted Successfully"})
          //console.log("hittedd")
     })
     .catch(function(err){
          res.status(500).json({errorMessage: err})
     })
})

router.get('/vehicle/fetch1',authCustomer.verifyMain, function(req,res){
     //console.log(req.customer._id)
     Vehicle.find({vehicleownerid:req.customer._id})
     
     .then(function(vehicleData){
          res.status(200).json({success:true,count: vehicleData.length,data:vehicleData})
     })
})




module.exports = router