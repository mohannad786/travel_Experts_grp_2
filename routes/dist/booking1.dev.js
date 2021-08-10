"use strict";

var express = require('express');

var router = express.Router();

var mongo = require("mongodb").MongoClient;

var uniqueValidator = require("mongoose-unique-validator");

var _require = require("../models/packages"),
    Product = _require.Product;

var _require2 = require("../models/booking1"),
    Purchase = _require2.Purchase;

console.log("hhh"); // Process to book package data

router.post("/", function (req, res, next) {
  var data = req.body;
  var booking1 = new Booking1();
  booking1.userId = 3;
  booking1.packageid = req.body.packageid;
  booking1.TravellerCount = req.body.TravellerCount;
  console.log(booking1);
  booking1.save(function (err) {
    if (err) return processErrors(err, "det", req, res, req.body);
    res.redirect("booking1");
  });
});
module.exports = router;
//# sourceMappingURL=booking1.dev.js.map
