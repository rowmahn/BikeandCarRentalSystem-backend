const express = require('express');
const router = express.Router();

const Customer = require('../models/customer');
const {check,validationResult} = require('express-validator'); 

const bcryptjs = require('bcryptjs'); //password encryption

const customerAuthentication = require('../middleware/customerAuthentication')

const jsonwebtoken = require('jsonwebtoken')

const upload = require('../middleware/upload');

const passportHttp = require('passport-http');



//Register Route for Customer

router.post('/customer/insert',[

     check('customertype',"customertype is required!").not().isEmpty(),
     check('name',"name is required!").not().isEmpty(),
     check('address',"address is required!").not().isEmpty(),
     check('citizenshipnumber',"citizenshipnumber is required!").not().isEmpty(),
     check('licencenumber',"licencenumber is required!").not().isEmpty(),
     check('email',"email is required!").not().isEmpty(),
     check('username',"username is required!").not().isEmpty(),
     check('password',"password is required!").not().isEmpty(),

     check('email',"email is invalid!").isEmail(),
     

], function(req,res){

     const errors = validationResult(req)
     console.log(errors)

     if (errors.isEmpty()){

          const customertype = req.body.customertype
          const name = req.body.name
          const address = req.body.address
          const citizenshipnumber = req.body.citizenshipnumber
          const licencenumber = req.body.licencenumber
          const email = req.body.email
          const username = req.body.username
          const password = req.body.password
          

          bcryptjs.hash(password, 10, function(err,hash){

               const customerInsert = new Customer({customertype: customertype,name: name, address: address, citizenshipnumber:citizenshipnumber,licencenumber:licencenumber, email: email, username: username, password: hash})
               customerInsert.save()
               .then(function(result){
                    //success
                    res.status(201).json({
                         success: true,
                         data: result
                    
                    });

               })
               .catch(function (error){
                    res.status(500).json({errorMessage: "Customer cannot be registered!!!"});
               })
               

          })

     }
     else{
          res.status(400).json({errorMessage:"Validation error!!! Customer Not Registered"})
     }  
})


//Login Route for Customer

router.post('/customer/login', function(req,res){

     Customer.findOne({username: req.body.username})
     .then(function(customerData){

          if(customerData === null){
               return res.status(401).json({errorMessage: "Unauthorized Customer!!!"});
          }
          bcryptjs.compare(req.body.password,customerData.password,function(err,result){
               
               if(result===false){
                    return res.status(401).json({errorMessage: "Invalid Username or Password!!!"});
               }

               const customerToken=jsonwebtoken.sign({customerId: customerData._id,customerUsername: customerData.username},'secretkey');
               res.status(200).json({success: true,customerToken: customerToken, data:customerData,customername:customerData.name, customerId: customerData._id,customertype:customerData.customertype})
               console.log(customerData.name)

          })
     })
     .catch()
})



//Customer fetch
router.get('/customer/profile',customerAuthentication.verifyMain, function(req,res){
     customerData= req.customer

   Customer.findOne({id:req.customer._id})
   
     .then(function(){
     
          
          res.status(200).json({success:true,customerData})
         // console.log(customerData)
     })
     .catch(function(err){
          res.status(500).json({errorMessage: err})
     })
})


module.exports=router