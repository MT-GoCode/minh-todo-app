const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Blueprint schema for database
const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  birth: {
    type: Date,
    default: Date.now()
  },
  country: {
    type: String
  }
});

module.exports = User = mongoose.model("users", UserSchema);
