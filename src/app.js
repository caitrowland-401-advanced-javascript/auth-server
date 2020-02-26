// Third-party resources
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

// Prepare the Express app
const app = express()

// models
const User = require('../models/users')


// App-level middleware
app.use(express.json())
const basicAuth = require('../middleware/basic-auth')
const { createNewUser, signIn} = require('../lib/routeHandlers')

// routes
app.post('/signup', createNewUser)
app.post('/signin', basicAuth, signIn)


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