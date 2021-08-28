const express = require('express') 
const bodyParser = require('body-parser') 
const cors = require('cors')
const path = require('path')
const customerRoute = require('./routes/customer');
const vehicleRoute = require('./routes/vehicle');


require('./db/db')

const app = express()
app.use('/images', express.static(path.join(__dirname, 'images')));


app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))


app.use(express.json())

app.use(customerRoute)
app.use(vehicleRoute)



app.listen(90);