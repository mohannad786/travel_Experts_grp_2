"use strict";

var express = require('express');

var router = express.Router();

var mongo = require("mongodb").MongoClient;

var uniqueValidator = require("mongoose-unique-validator");

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

    if (pid) query.packid = parseInt(pid); // If you need certain product

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
    if (err) throw err; // Render the PUG template with the product data we got from the DB

    res.render('index', {
      mypackages: packdata
    });
  });
});
/* GET one product listing. */

router.get('/:packageid', function (req, res, next) {
  var packid = req.params.packageid;
  console.log(packid);
  getPackages(packid, function (err, data) {
    if (err) throw err;
    res.render('index', {
      mypackages: data,
      isdetails: true
    });
  });
}); // // Generate random Greeting Program
// var myarray = ['ready for some exciting time', 'how are you today', 'good to see you', 'hope you are having a good day']
// const greet = Math.floor(Math.random() * myarray.length);
// var greetings = myarray[greet];
// console.log(myarray[greet]);
// // /* GET home page and display greeting message */
// // router.get('/', function(req, res, next) {
// //   res.render('index', { 
// //     greet_msg: ('Welcome to our travel Portal,'+greetings ),
// //     date_time: (new Date()).toString(),
// //   });
// // });

module.exports = router;
//# sourceMappingURL=index.dev.js.map
