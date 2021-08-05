var express = require('express');
var router = express.Router();
const mongo = require("mongodb").MongoClient;
const uniqueValidator = require("mongoose-unique-validator");
// Generate random Greeting Program
var myarray = ['ready for some exciting time', 'how are you today', 'good to see you', 'hope you are having a good day']


function getPackages(pid, callback) {
  mongo.connect(process.env.MONGO_URL, {  // Create the DB connection
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
    (err, client) => {  // The callback will be called if the connection was succeded
      if (err) { throw err; }
      const db = client.db("userdata");  // get reference to the DB
      const collection = db.collection("packages"); // Get reference to the collection
      const query = {}    // Empty query to get all data
      if (pid) query.packid = (pid);  // If you need certain product
      collection.find(query).toArray((err, items) => {
        // console.log(query)
        // if (err) { throw err; }
        
        // code goes here
        // console.log(items)
        callback(err, items)
      });

    }
  );
  }
/* GET all packages listing. */

router.get('/', function (req, res, next) {
  // Read the packages list from the DB
  getPackages(null, // null => get all packages
    function (err, packdata) { // Callback function, will be called when the data from the DB is ready
      if (err) throw err
      const greet = Math.floor(Math.random() * myarray.length);
      var greetings = myarray[greet];
      console.log(myarray[greet]);
      // Render the PUG template with the product data we got from the DB
       res.render('index', {
        mypackages: packdata,
        greet_msg: ('Welcome to our travel Portal, '+greetings ),
        date_time: ('You have logged in on,' +(new Date()).toString()),
      });
    }
  );
});

/* GET one product listing. */
router.get('/details/:packageid', function (req, res, next) {
  const packid = req.params.packageid
  console.log(packid);
  getPackages(packid,
    function (err, data) {
 
      if (err) throw err
      res.render('index', {
        mypackages: data,
        isdetails: true,
        
      });
    }
  );
});




module.exports = router;



