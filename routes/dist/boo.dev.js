"use strict";

var express = require('express');

var router = express.Router();

var mongo = require("mongodb").MongoClient;

var uniqueValidator = require("mongoose-unique-validator");

var _require = require("../models/packages"),
    Product = _require.Product;

var _require2 = require("../models/booking1"),
    Purchase = _require2.Purchase;

console.log("hhh");
module.exports = router;
//# sourceMappingURL=boo.dev.js.map
