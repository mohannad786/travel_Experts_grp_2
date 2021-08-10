"use strict";

var mongoose = require("mongoose");

var uniqueValidator = require("mongoose-unique-validator");

var Schema = mongoose.Schema;
mongoose.connect(process.env.MONGO_URL || mongoDBurl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var contactSchema = new mongoose.Schema({
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
    required: "last name is required",
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
  }
});
contactSchema.plugin(uniqueValidator);
module.exports.Contact = mongoose.model('Contact', contactSchema);
//# sourceMappingURL=contact.dev.js.map
