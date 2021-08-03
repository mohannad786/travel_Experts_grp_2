var express = require('express');
var router = express.Router();
const Contact = require('../models/contact').Contact;

 router.get('/', function (req, res, next) {
  
    res.render('contact');
  });

// To create a new database entry
router.post('/', function (req, res, next) {
  // const = new Contact(req.body);
  const contact = new Contact();
  contact.firstname = req.body.firstname
  contact.lastname= req.body.lastname
  contact.email= req.body.email
  contact.comment= req.body.comment
  contact.save(err => {
    // if(err) throw err;
    if (err) {
     
      const errorArray = [];
      const errorKeys = Object.keys(err.errors);
      errorKeys.forEach(key => errorArray.push(err.errors[key].message));
      return res.render("contact", {
        errors: errorArray
      });
    }
    res.redirect("/thankyou");
  });
});

// Shows a single contact
router.get('/:email1', function (req, res, next) {
  const data = req.params.email1;
  Contact.findOne({ email: data }, (err, contact) => {
   res.render('user-data', { userdat:contact });
    console.log(contact.comment);
    //console.log(userdat);
  });
});

module.exports = router;

