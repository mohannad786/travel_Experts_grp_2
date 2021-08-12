"use strict";

// Create a model for Travel Packages1 
var mongoose = require("mongoose");

var uniqueValidator = require("mongoose-unique-validator");

mongoose.connect(process.env.MONGO_URL || mongoDBurl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var packages1Schema = new mongoose.Schema({
  packid: {
    type: Number
  },
  packname: {
    type: String
  },
  PackDetail: {
    type: String,
    trim: true
  },
  TripStart: {
    type: Date
  },
  TripEnd: {
    type: Date,
    trim: true
  },
  price: {
    type: Number
  },
  imgpath: String,
  imgpath1: String,
  imgpath2: String,
  imgpath3: String
});
packages1Schema.plugin(uniqueValidator);
module.exports.Packages1 = mongoose.model('Packages1', packages1Schema);
//# sourceMappingURL=packages1.dev.js.map
