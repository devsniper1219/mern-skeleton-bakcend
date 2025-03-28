const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/all", controller.allAccess);
  app.get("/api/user/profile", [authJwt.verifyToken], controller.userProfile);
  app.get("/api/user/user", [authJwt.verifyToken], controller.userBoard);
  app.get("/api/user/mod", [authJwt.verifyToken, authJwt.isModerator], controller.moderatorBoard);
  app.get("/api/user/admin", [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);
};
