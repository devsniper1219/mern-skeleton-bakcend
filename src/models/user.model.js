const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: {type: String, required: true},
    user_id: {type: String, required: true},
    start_time: {type: String, required: true},
    private_key: {type: String, required: true},
    public_key: {type: String, required: true},
    email: {type: String},
    password: {type: String},
    diamond_count: {type: Number, default: 0}
  })
);

module.exports = User;
