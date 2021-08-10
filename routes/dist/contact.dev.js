"use strict";

var express = require('express');

var router = express.Router();

var mongoose = require("mongoose");

var uniqueValidator = require("mongoose-unique-validator");

var Contact = require('../models/contact').Contact;

router.get('/', function (req, res, next) {
  res.render('contact');
}); // To create a new database entry

router.post('/', function (req, res, next) {
  // const = new Contact(req.body);
  var contact = new Contact();
  contact.firstname = req.body.firstname;
  contact.lastname = req.body.lastname;
  contact.email = req.body.email;
  contact.comment = req.body.comment;
  contact.save(function (err) {
    // if(err) throw err;
    if (err) {
      var errorArray = [];
      var errorKeys = Object.keys(err.errors);
      errorKeys.forEach(function (key) {
        return errorArray.push(err.errors[key].message);
      });
      return res.render("contact", {
        errors: errorArray
      });
    }

    res.redirect("/thankyou");
  });
}); // Shows a single contact

router.get('/:email1', function (req, res, next) {
  var data = req.params.email1;
  Contact.findOne({
    email: data
  }, function (err, contact) {
    res.render('user-data', {
      userdat: contact
    });
    console.log(contact.comment); //console.log(userdat);
  });
});
module.exports = router;
//# sourceMappingURL=contact.dev.js.map
