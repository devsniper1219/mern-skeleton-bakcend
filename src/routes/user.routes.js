const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.get("/api/user/:user_id", [authJwt.verifyToken], controller.userProfile);
};
