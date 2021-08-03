"use strict";

// Using Node.js `require()`
var mongoose = require("mongoose");

var uniqueValidator = require("mongoose-unique-validator"); //var mongoDBurl = "mongodb://localhost:27017/blog";


mongoose.connect(process.env.MONGO_URL || mongoDBurl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var db = mongoose.connection; /// To log the Mongoose erros to the console directly

db.on("error", console.error.bind(console, "connection error:"));
var postSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: "First name is required",
    trim: true,
    validate: {
      validator: function validator(v) {
        return v.length > 3;
      },
      message: function message(props) {
        return "Please ensure you have entered your comment.";
      }
    }
  },
  lastname: {
    type: String,
    required: "First name is required",
    trim: true,
    validate: {
      validator: function validator(v) {
        return v.length > 3;
      },
      message: function message(props) {
        return "Please ensure you have entered your comment.";
      }
    }
  },
  email: {
    type: String,
    trim: true,
    validate: {
      validator: function validator(v) {
        return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
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
  }
});
postSchema.plugin(uniqueValidator);
module.exports.Post = mongoose.model('Post', userSchema);
//# sourceMappingURL=contact1.dev.js.map
