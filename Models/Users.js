const mongoose = require("mongoose");


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: false,
    },
    avatar: {
      type: String
    },
    bio: {
      type: String
    },
    repos: {
      type: Number
    }
  },
  { timestamps: true }
);


module.exports = mongoose.model("User", userSchema);
