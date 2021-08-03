"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var express = require("express");

var router = express.Router();

var _require = require("../models/user"),
    User = _require.User;

var bcrypt = require("bcryptjs");

var pageRegister = {
  pagetitle: "Sign-up",
  pageheading: "Create a new account",
  pagemessage: "Please enter the required information to create a new account.",
  hideLogin: true
}; // const pageShowUsers = {
//   pagetitle: "Blog users",
//   pageheading: "List all users",
//   pagemessage: "These are all userets.",
// };

/* Sign-up page. */

router.get("/", function (req, res, next) {
  res.render("signup", pageRegister);
}); //router.get("/signup", function (req, res, next) {
//  res.render("signup/login");
//});

router.post("/", function (req, res, next) {
  // Create a new user object from the User Model
  var user = new User(req.body);
  var errs = user.validateSync(); // Run the model validation

  if (errs) {
    return processErrors(errs, req, res);
  }

  bcrypt.hash(req.body.password, 10, function (err, hashedPassword) {
    if (err) throw err; // Replace the plain password with the hashed password

    user.password = hashedPassword; // Store the use object in the DB

    user.save(function (err, result) {
      if (err) {
        return processErrors(err, req, res);
      }

      console.log(result);
      var headermessage = "Account created ".concat(result.fname);
      res.redirect("/?headermessage=" + headermessage);
    });
  });
});

function processErrors(errs, req, res) {
  // If there are errors from the Model schema
  var errorArray = [];
  var errorKeys = Object.keys(errs.errors);
  errorKeys.forEach(function (key) {
    return errorArray.push(errs.errors[key].message);
  });
  return res.render("signup", _objectSpread({}, pageRegister, {
    errors: errorArray
  }, req.body));
}

module.exports = router;
//# sourceMappingURL=signup.dev.js.map
