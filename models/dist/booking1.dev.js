"use strict";

// Using Node.js `require()`
var mongoose = require("mongoose");

var uniqueValidator = require("mongoose-unique-validator");

var Schema = mongoose.Schema;
mongoose.connect(process.env.MONGO_URL || mongoDBurl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var booking1Schema = new Schema({
  packageId: {
    type: Schema.Types.ObjectId,
    ref: "Packages"
  },
  userId: {
    type: Number,
    "default": 1
  },
  TravellerCount: {
    type: Number,
    required: "Traveller Count is required"
  }
});
booking1Schema.plugin(uniqueValidator);
module.exports.Booking1 = mongoose.model('Booking1', booking1Schema);
//# sourceMappingURL=booking1.dev.js.map
