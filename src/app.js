// Third-party resources
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')

// Prepare the express app
const app = express()

// models
const User = require('../models/users')


// App-level middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

//Routes 
const authRouter = require('../routes/authRouter')
app.use(authRouter)


//catch alls 
const notFound = require('../middleware/notFound')
const errorHandler = require('../middleware/errorHandler')
app.use(notFound);
app.use(errorHandler)

//server start up
let isRunning = false;

module.exports = {
    server: app, 
    start: function(port) {
        if (!isRunning) {
            app.listen(port, () => {
                isRunning = true
                console.log(`Server is listening on ${port}`)    
            })
        } else {
            console.error(`Server is already running on ${port}`)
        }
    }
}