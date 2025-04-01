const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.post('/api/auth/set-password', controller.setPassword)
  app.post("/api/auth/login", controller.login);
};
