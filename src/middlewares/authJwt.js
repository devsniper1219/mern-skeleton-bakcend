const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;
const Role = db.role;

require('dotenv').config();

verifyToken = (req, res, next) => {
  let token = req.session.token;

  const { user_id } = req.params;
  if (user_id) {
    const decodedToken = jwt.decode(token);
    if (!decodedToken || user_id != decodedToken.user_id)
      return res.status(400).json({message: 'Invalid user'})
  }

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(
    token,
    process.env.SECRET_KEY,
    (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!",
        });
      }

      const newToken = jwt.sign(
        { user_id: decoded.user_id },
          process.env.SECRET_KEY,
          {
            algorithm: 'HS256',
            allowInsecureKeySizes: true,
            expiresIn: 3600,
          });
      
      req.session.token = newToken;

      next();
    });
};

isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Admin Role!" });
        return;
      }
    );
  });
};

isModerator = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "moderator") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Moderator Role!" });
        return;
      }
    );
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
};
module.exports = authJwt;
