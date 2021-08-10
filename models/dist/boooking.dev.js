"use strict";

// Using Node.js `require()`
var mongoose = require("mongoose");

var uniqueValidator = require("mongoose-unique-validator"); //var mongoDBurl = "mongodb://localhost:27017/blog";


mongoose.connect(process.env.MONGO_URL || mongoDBurl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var db = mongoose.connection; /// To log the Mongoose erros to the console directly

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("we're connected!");
}); // Create model that all hotels must abide by

var BookingSchema = new mongoose.Schema({
  PackDetail: {
    type: String,
    required: "Package Detailsotel description is required",
    trim: true
  },
  TripStart: {
    type: Date,
    required: "Trips Start Date",
    max: 5
  },
  TripEnd: {
    type: Date,
    required: "Trip End Date",
    trim: true
  },
  TravellerCount: {
    type: Number,
    required: "Traveller Count is required"
  }
});
contactSchema.plugin(uniqueValidator);
module.exports.Package = mongoose.model('Package', contactSchema);
//# sourceMappingURL=boooking.dev.js.map
