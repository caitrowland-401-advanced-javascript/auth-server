const User = require('../models/users')


// POST to /signup to sign up a user.
// Payload looks like
// username:String, email:String, password:String, role:String ("user" or "admin")

async function createNewUser (request, response) {
    const newUser = new User(request.body)
    newUser.save() // write a save() function in your User model
    .then(user => {
      const token = user.generateToken()
      response.status(200).json({ token })
    })
    .catch(err => response.status(403).json({ error: err.message }))
}


// POST to /signin to verify that a user can sign in
// create a middleware called basicAuth that handles the user validation
function signIn(request, response, next) {
    response.json({message: 'success'})
}

module.exports = {
    createNewUser,
    signIn
}
  