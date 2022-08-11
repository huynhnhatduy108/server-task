require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000
const morgan = require('morgan');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('combined'))
app.use(cors())

mongoose.connect(process.env.MONGODB_URL,{useUnifiedTopology : true, useNewUrlParser :true}).then(() => {
    console.log("✅ MongoDB Connected successfully");
  })
  .catch(err => console.log("❌ Connection failed ",err));


let routes = require('./api/routes/taskRoute');
routes(app);

app.get('/', (req, res) => {
    res.json({ info: 'Task Api' })
})

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
})

app.listen(PORT)

console.log('RESTful API server started on: ' + PORT)