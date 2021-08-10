"use strict";

var express = require('express');

var router = express.Router();

var mongoose = require("mongoose");

var uniqueValidator = require("mongoose-unique-validator");

var Contact = require('../models/contact').Contact;

router.get('/', function (req, res, next) {
  res.render('contact');
}); // load booking data

router.post("/", function (req, res, next) {
  var data = req.body;
  var contact = new Contact();
  contact.firstname = req.body.firstname;
  contact.lastname = req.body.lastname;
  contact.email = req.body.email;
  contact.comment = req.body.comment;
  contact.save(function (err) {
    if (err) return processErrors(err, "det", req, res, req.body);
    res.redirect("/thankyou");
  });
});
module.exports = router;
//# sourceMappingURL=contact.dev.js.map
