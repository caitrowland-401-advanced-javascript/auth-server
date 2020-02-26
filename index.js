// Third-party resources
require('dotenv').config()

//Connect to mongo server
const mongoose = require('mongoose');
const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}
const {MONGODB_URI, PORT} = process.env
mongoose.connect(MONGODB_URI, mongooseOptions, () => {
    console.log('Connected to MongoDB')
})

//server start up  
const server = require('./src/app');
server.start(PORT)