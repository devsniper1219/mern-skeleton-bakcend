const User = require('../models/user.model')

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userProfile = (req, res) => {
  User.findById(req.userId).exec((err, user) => {
    if (err)
      return res.status(500).send({ message: err });
    return res.status(200).send(user.email)
  })
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
