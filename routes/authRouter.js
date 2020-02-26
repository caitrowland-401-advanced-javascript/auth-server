const express = require('express')
const authRouter = express.Router()

const User = require('../models/users')
const basicAuth= require('../middleware/basic-auth')

// authRouter.get('/', (request, response) => {
//     response.send('it\'s alive')
// })

authRouter.post('/signup', (request, response, next) => {
    const user = new User(request.body);
    user.save()
        .then(result => response.status(200).json({token: user.generateToken()}))
        .catch(next)
})

authRouter.post('/signin', basicAuth, (request, response, next) => {
    response.status(200).json({token: request.token})
})

authRouter.get('/users', async (request, response, next) => {
    const allUsers = await User.find({})
    response.status(200).json(allUsers)
})

module.exports = authRouter