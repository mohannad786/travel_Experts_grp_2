const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { Schema } = mongoose;

mongoose.connect(process.env.MONGO_URL || mongoDBurl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const contactSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: "First name is required",
        trim: true,
        validate: {
          validator: function (v) {
            return v.length > 3;
          },
          message: (props) => `Please ensure you have entered your comment.`,
        },
      },    
      
      lastname: {
        type: String,
        required: "last name is required",
        trim: true,
        validate: {
          validator: function (v) {
            return v.length > 3;
          },
          message: (props) => `Please ensure you have entered your comment.`,
        },
      },    
      email: {
        type: String,
        trim: true,
         validate: {
          validator: function (v) {
            return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
          },
          message: (props) => `${props.value} is not a valid Email address.`,
        },
      },
      comment: {
        type: String,
        required: "Please write your post body.",
        trim: true,
        validate: {
          validator: function (v) {
            return v.length > 3;
          },
          message: (props) => `Please ensure you have entered your comment.`,
        },
      },       
    
});
contactSchema.plugin(uniqueValidator);
module.exports.Contact = mongoose.model('Contact',contactSchema);