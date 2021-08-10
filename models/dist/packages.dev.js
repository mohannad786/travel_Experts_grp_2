"use strict";

var mongoose = require("mongoose");

var uniqueValidator = require("mongoose-unique-validator");

mongoose.connect(process.env.MONGO_URL || mongoDBurl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var packagesSchema = new mongoose.Schema({
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
packagesSchema.plugin(uniqueValidator);
module.exports.Packages = mongoose.model('Packages', packagesSchema);
//# sourceMappingURL=packages.dev.js.map
