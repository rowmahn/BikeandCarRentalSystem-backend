const jwt = require('jsonwebtoken');
const Customer=require("../models/customer");

module.exports.verifyMain = function (req,res,next) 
{
    
    try{

        const token = req.headers.authorization.split(" ")[1];
        const data = jwt.verify(token,'secretkey');
        Customer.findOne({_id: data.customerId})
        .then(function (result) {

        //success// all infomation of the logged in user
        req.customer = result
        
        next();
        
        })
        .catch(function(result){
        //invalid

        res.status(403).json({error: "Auth Failed"})
        })
      

    }

    catch(e){
        res.status(403).json({error: e})

    } 
    
}

module.exports.verifyOwner = function(req,res,next){

    if(!req.customer){
        return res.status(401).json({message : "not allowed!!!"})

    }
    else if (req.customer.customertype!= 'Owner' || req.customer.customertype!== 'Admin'){
        return res.status(401).json({message : "permission denied!!!"})
    }
    next();
}

module.exports.verifyRenter = function(req,res,next){

    if(!req.customer){
        return res.status(401).json({message : "not allowed!!!"})
    }
    else if (req.customer.customertype!== 'Renter' || req.customer.customertype!== 'Admin'){
        return res.status(401).json({message : "permission denied!!!"})
    }
    next();
}

module.exports.verifyStaff = function(req,res,next){

    if(!req.customer){
        return res.status(401).json({message : "not allowed!!!"})
    }
    else if (req.customer.customertype!== 'Staff' || req.customer.customertype!== 'Admin'){
        return res.status(401).json({message : "permission denied!!!"})
    }
    next();
}



