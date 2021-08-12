// Create a model for customer 
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

mongoose.connect(process.env.MONGO_URL || mongoDBurl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const customerSchema = new mongoose.Schema({
  _id: Number,
  fname: {
    type: String,
    trim: true,
    default: "-",
  },
  lname: {
    type: String,
    trim: true,
  },
  registeredOn: {
    type: Date,
    default: new Date(),
  },
});

customerSchema.plugin(uniqueValidator);
// Create a model Customer using the customerSchema
module.exports.Customer = mongoose.model("Customer", customerSchema);