const { authJwt } = require("../middlewares");
const controller = require("../controllers/lottery.controller");

module.exports = function(app) {
  app.get('/api/lottery/get-top-lotteries/:index', [authJwt.verifyToken], controller.getLotteryData)
  app.get('/api/lottery/save-lotteries', [authJwt.verifyToken], controller.saveLotteries)
};
