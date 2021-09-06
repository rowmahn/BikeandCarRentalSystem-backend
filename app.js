const express = require('express') 
const bodyParser = require('body-parser') 
const cors = require('cors')
const path = require('path')
const customerRoute = require('./routes/customer');
const vehicleRoute = require('./routes/vehicle');
const rentvehicleRoute = require('./models/rentvehicle')

require('./db/db')

const app = express()
app.use('/images', express.static(path.join(__dirname, 'images')));


app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))


app.use(express.json())

app.use(customerRoute)
app.use(vehicleRoute)
app.use(rentvehicleRoute)



app.listen(90,function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });