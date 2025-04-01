const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.login = (req, res) => {
  const { user_id, password } = req.body;

  User.findOne({ user_id })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      if (!user.password) {
        return res.status(200).json({ needsPassword: true });
      }

      return bcrypt.compare(password, user.password).then((passwordIsValid) => {
        if (!passwordIsValid) {
          return res.status(401).json({ message: "Invalid Password!" });
        }

        const token = jwt.sign({ user_id: user.user_id }, process.env.SECRET_KEY, {
          algorithm: "HS256",
          expiresIn: 3600,
        });

        req.session.token = token;

        res.status(200).json({
          message: "Login successful",
          user: {
            id: user._id,
            username: user.username,
            user_id: user.user_id,
            email: user.email,
          },
        });
      });
    })
    .catch((error) => res.status(500).json({ message: "Server error", error: error.message }));
};

exports.setPassword = (req, res) => {
  const { user_id, email, password } = req.body;

  User.findOne({ user_id })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      if (email) user.email = email;

      if (password) {
        return bcrypt
          .genSalt(10)
          .then((salt) => bcrypt.hash(password, salt))
          .then((hashedPassword) => {
            user.password = hashedPassword;
            return user.save();
          });
      }

      return user.save();
    })
    .then(() => res.status(200).json({ message: "Password set successfully" }))
    .catch((error) =>
      res.status(500).json({ message: "Server error", error: error.message })
    );
};


exports.logout = (req, res) => {
  req.session = null;
  res.status(200).send({ message: "You've been signed out!" });
};