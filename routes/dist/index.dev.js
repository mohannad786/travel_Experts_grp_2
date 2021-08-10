"use strict";

var express = require('express');

var router = express.Router();

var mongo = require("mongodb").MongoClient;

var uniqueValidator = require("mongoose-unique-validator");

var _require = require("../models/packages"),
    Packages = _require.Packages;

var _require2 = require("../models/booking1"),
    Booking1 = _require2.Booking1; // Generate random Greeting Program


var myarray = ['ready for some exciting time', 'how are you today', 'good to see you', 'hope you are having a good day'];

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/signup');
}

function getPackages(pid, callback) {
  mongo.connect(process.env.MONGO_URL, {
    // Create the DB connection
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, function (err, client) {
    // The callback will be called if the connection was succeded
    if (err) {
      throw err;
    }

    var db = client.db("userdata"); // get reference to the DB

    var collection = db.collection("packages"); // Get reference to the collection

    var query = {}; // Empty query to get all data

    if (pid) query.packid = pid; // If you need certain product

    collection.find(query).toArray(function (err, items) {
      // console.log(query)
      // if (err) { throw err; }
      // code goes here
      // console.log(items)
      callback(err, items);
    });
  });
}
/* GET all packages listing. */


router.get('/', function (req, res, next) {
  // Read the packages list from the DB
  getPackages(null, // null => get all packages
  function (err, packdata) {
    // Callback function, will be called when the data from the DB is ready
    if (err) throw err;
    var greet = Math.floor(Math.random() * myarray.length);
    var greetings = myarray[greet];
    console.log(myarray[greet]); // Render the PUG template with the product data we got from the DB

    res.render('index', {
      mypackages: packdata,
      greet_msg: 'Welcome to our travel Portal, ' + greetings,
      date_time: new Date().toString()
    });
  });
});
/* GET one product listing. */

router.get('/details/det/:packageid', function (req, res, next) {
  var packid = req.params.packageid;
  console.log(packid);
  getPackages(packid, function (err, data) {
    if (err) throw err;
    res.render('det', {
      mypackages: data,
      isdetails: true
    });
  });
}); // load booking data

router.post("/book", function (req, res, next) {
  var data = req.body;
  var booking1 = new Booking1();
  booking1.userId = req.user;
  booking1.packageId = req.body.packageId;
  booking1.TravellerCount = req.body.TravellerCount;
  console.log(booking1.packageId);
  booking1.save(function (err) {
    if (err) return processErrors(err, "det", req, res, req.body);
    res.redirect("book1");
  });
});
/* GET the purchases page. */

router.get("/book1", function (req, res, next) {
  Booking1.find({
    userId: req.user
  }) // Replace the productId with the corresponding product object from the products collection(table)
  //console.log(Booking1)
  .populate("packageId").exec(function (err, booking1) {
    if (err) console.log(err);
    res.render("book1", {
      booking1: booking1
    });
  });
});
/* Process the product return, sent as GET request, for the given product Id. */

router.get("/return/:bookingid", function (req, res, next) {
  var bookingid = req.params.bookingid;
  Booking1.findOneAndDelete({
    _id: bookingid
  }, function (err) {
    if (err) console.log(err);
    res.redirect("/"); // Redirect to the purchases page
  });
});
module.exports = router;
//# sourceMappingURL=index.dev.js.map
