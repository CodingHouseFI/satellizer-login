'use strict';

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

let userSchema = new mongoose.Schema({
  email: String,
  displayName: String, // their name
  profileImage: String,
  facebook: String  // Facebook profile id
});

userSchema.statics.authMiddleware = function(req, res, next) {

  let tokenHeader = req.headers.authorization;

  if(!tokenHeader) {
    return res.status(401).send({error: 'Missing authorization header.'});
  }

  let token = tokenHeader.split(' ')[1];

  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if(err) return res.status(401).send(err);

    User.findById(payload._id, (err, user) => {
      if(err || !user) return res.status(401).send(err || {error: 'User not found.'});

      req.user = user;

      next();
    }).select('-password');
  });
};


userSchema.methods.generateToken = function() {
  let payload = {
    _id: this._id
  };

  let token = jwt.sign(payload, JWT_SECRET, {expiresIn: '1 day'});

  return token;
};

let User = mongoose.model('User', userSchema);

module.exports = User;
