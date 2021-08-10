"use strict";

// Using Node.js `require()`
var mongoose = require("mongoose");

var uniqueValidator = require("mongoose-unique-validator");

var Schema = mongoose.Schema;
mongoose.connect(process.env.MONGO_URL || mongoDBurl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var bookingSchema = new Schema({
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
bookingSchema.plugin(uniqueValidator);
module.exports.Booking = mongoose.model('Booking', bookingSchema);
//# sourceMappingURL=booking.dev.js.map
