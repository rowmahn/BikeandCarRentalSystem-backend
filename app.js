const express = require('express') 
const bodyParser = require('body-parser') 
const cors = require('cors')
const path = require('path')





const app = express()


app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))


app.use(express.json())




app.listen(90);