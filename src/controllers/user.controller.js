const User = require('../models/user.model')

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userProfile = (req, res) => {
  const { user_id } = req.params;

  User
    .findOne({user_id})
    .then((user) => {
      if (!user)
        return res.status(400).json({message: 'Invalid User'})
      const userData = {
        username: user.username,
        user_id: user.user_id,
        publicKey: user.public_key,
        email: user.email,
        diamond_count: user.diamond_count
      };

    return res.status(200).json(userData);
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
