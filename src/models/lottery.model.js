const mongoose = require("mongoose");

const Lottery = mongoose.model(
  "Lottery",
  new mongoose.Schema({
    id: { type: Number, required: true},
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    status: { type: String, required: true },
    type: { type: String, required: true },
    sold_tickets: {type: Number, required:  true, default: 0},
    top_user_prize: {type: Number, required: true, default: 0},
    price: {type: Number, required: true, default: 50}
  })
);

module.exports = Lottery;
