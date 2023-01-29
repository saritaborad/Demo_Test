const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  phone: {
    type: Number,
    trim: true,
  },
  country: {
    type: String,
  },
  info: {
    typ: String,
  },
  doc: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
