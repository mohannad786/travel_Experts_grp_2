// Data model for Agents
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

mongoose.connect(process.env.MONGO_URL || mongoDBurl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
const agentSchema = new mongoose.Schema({
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

agentSchema.plugin(uniqueValidator);
// Create a model Agent using the agentSchema
module.exports.Agent = mongoose.model("Agent", agentSchema);