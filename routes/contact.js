var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Contact = require('../models/contact').Contact;

 router.get('/', function (req, res, next) {
  
    res.render('contact');
  });

// load booking data
router.post("/", function (req, res, next) {
  const data = req.body;
  const contact = new Contact();
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

