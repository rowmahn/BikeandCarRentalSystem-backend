const express = require('express');
const router = express.Router();

const Vehicle = require('../models/vehicle');
const { check, validationResult } = require('express-validator');
const { route } = require('./vehicle');
const authCustomer = require("../middleware/customerAuthentication")

const upload = require('../middleware/upload');



//Register Route for Vehicle

router.post('/vehicle/insert', function (req, res) {

     const errors = validationResult(req)

     if (errors.isEmpty()) {
          //console.log(req.body)
          const vehicletype = req.body.vehicletype
          const vehiclecompany = req.body.vehiclecompany
          const vehiclemodel = req.body.vehiclemodel
          const vehiclenumber = req.body.vehiclenumber
          const vehicleprice = req.body.vehicleprice
          const vehicleownercontact = req.body.vehicleownercontact
          const vehicleownerid = req.body.vehicleownerid

          const vehicleInsert = new Vehicle({ vehicletype: vehicletype, vehiclecompany: vehiclecompany, vehiclemodel: vehiclemodel, vehiclenumber: vehiclenumber, vehicleprice: vehicleprice, vehicleownercontact: vehicleownercontact, vehicleownerid: vehicleownerid })
          vehicleInsert.save()
               .then(function (result) {
                    //success
                    //console.log('vehicle added')
                    res.status(201).json({ success: true, data: result });

               })
               .catch(function (error) {
                    console.log('vehicle add error', error.message)
                    res.status(500).json({ errorMessage: error });
               })


     }
     else {
          res.status(400).json(errors.array())
     }
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

router.put("/vehicle/:id", upload.single('vehicleimage'), async function (req, res) {
     //console.log("image",req.file)
     if (req.file !== undefined) {
          try {
               const image = await Vehicle.findOneAndUpdate({ _id: req.params.id }, { $set: { vehicleimage: req.file.filename } }, { new: true })
               res.status(200).json({ success: true, data: image })
          }
          catch (e) {
               res.status(500).json({ error: e })
          }
     }
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




module.exports = router