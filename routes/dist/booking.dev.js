"use strict";

var express = require('express');

var router = express.Router();

var mongo = require("mongodb").MongoClient;

var uniqueValidator = require("mongoose-unique-validator");

var _require = require("../models/packages"),
    Product = _require.Product;

var _require2 = require("../models/booking"),
    Purchase = _require2.Purchase; // Process the buy product data


router.post("/", function (req, res, next) {
  var data = req.body;
  var booking = new Booking();
  booking.userId = 3;
  booking.packageid = req.body.packageid;
  booking.TravellerCount = req.body.TravellerCount;
  booking.save(function (err) {
    if (err) return processErrors(err, "booking", req, res, req.body);
    res.redirect("booking");
  });
});
module.exports = router;
//# sourceMappingURL=booking.dev.js.map
