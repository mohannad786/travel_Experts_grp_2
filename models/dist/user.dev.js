"use strict";

// // Create a model for User data for registeration
var mongoose = require("mongoose");

var uniqueValidator = require("mongoose-unique-validator");

var _require = require("./agent"),
    Agent = _require.Agent;

var _require2 = require("./customer"),
    Customer = _require2.Customer;

mongoose.connect(process.env.MONGO_URL || mongoDBurl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var db = mongoose.connection; /// To log the Mongoose erros to the console directly

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("we're connected!");
});
var userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: "Username is required",
    trim: true,
    unique: "The username must be unique.",
    lowercase: true
  },
  fname: {
    type: String,
    required: "First name is required",
    trim: true
  },
  lname: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    validate: {
      validator: function validator(v) {
        return /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/.test(v);
      },
      message: function message(props) {
        return "".concat(props.value, " is not a valid Email address.");
      }
    }
  },
  password: {
    type: String,
    required: "Please enter a password",
    trim: true,
    validate: {
      validator: function validator(v) {
        return /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{6,}$/.test(v);
      },
      message: function message(props) {
        return "Password should have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 6 characters.";
      }
    }
  },
  // more fields defined below
  role: {
    type: String,
    trim: true,
    "default": "customer"
  },
  customerId: {
    type: Number,
    ref: "Customer",
    "default": null
  },
  agentId: {
    type: Number,
    ref: "Agent",
    "default": null
  }
});
userSchema.plugin(uniqueValidator); // Create a model User using the userSchema

module.exports.User = mongoose.model("User", userSchema);
//# sourceMappingURL=user.dev.js.map
