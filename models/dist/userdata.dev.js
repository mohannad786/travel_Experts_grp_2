"use strict";

// Require the mongoose module
// var mongoose = require('mongoose');
// Set up a mongoose connection
// var mongoDB = "mongodb+srv://mo:comon123@cluster0.c2uhk.mongodb.net/userdata?authSource=admin&replicaSet=atlas-rvxm88-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true"
// mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
// Get the connection
// var db = mongoose.connection;
// Bind connection to error event (to get notification of connection errors)
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', function () {
//     console.log("we're connected!")
// });
var uniqueValidator = require("mongoose-unique-validator");

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
  comment: {
    type: String,
    required: "Please write your post body.",
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
//# sourceMappingURL=userdata.dev.js.map
