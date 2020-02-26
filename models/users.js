const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const SECRET = process.env.SECRET || 'changeme'

const usersSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, require: true },
  email: { type: String },
  role: { type: String, required: true, default: 'user', enum: ['admin', 'user'] }
})

usersSchema.pre('save', async function () {
  if(this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 5)
  }
})

usersSchema.methods.generateToken = function () {
  const tokenData = {
    username: this.username,
    email: this.email 
  }
  return jwt.sign(tokenData, SECRET)
}

usersSchema.statics.authenticateBasic = function (username, password){
  return this.findOne({ username })
    .then(result => result && result.comparePassword(password))
    .catch(console.error)

}

usersSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password)
    .then(valid => valid ? this : null)
    .catch(console.error)
}

module.exports = mongoose.model('User', usersSchema)
