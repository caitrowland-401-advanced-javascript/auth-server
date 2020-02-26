const base64 = require('base-64')
const Users = require('../models/users')

function basicAuth (request, response, next) {
// check if we have an authorizaiton header 
  if (!request.headers.authorization) {
    next(new Error('Invalid Login'))
    return
  }

  //retrieve header, get username and password out of base64 and split so you get the info formated as {username: password}
  const basic = request.headers.authorization.split(' ').pop();
  const decoded = base64.decode(basic)
  const [username, password] = decoded.split(':')

  // now that we know the username and password, ask if the user is ok
  return Users.authenticateBasic(username, password)
    .then(_validate)

    function _validate(user) {
      if(user) {
        request.user = user
        request.token = user.generateToken()
        next()
      } else {
        next(new Error ('invalid'))
    }
  }
}

module.exports = basicAuth
