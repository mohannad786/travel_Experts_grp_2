
// Using Node.js `require()`
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { Schema } = mongoose;

mongoose.connect(process.env.MONGO_URL || mongoDBurl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const booking1Schema = new Schema({
   
packageId: { type: Schema.Types.ObjectId, ref: "Packages" },
userId: { type: Number, default: 1 },
  
TravellerCount: {
      type: Number,
      required: "Traveller Count is required"
  },
 
});

booking1Schema.plugin(uniqueValidator);
module.exports.Booking1 = mongoose.model('Booking1',booking1Schema);