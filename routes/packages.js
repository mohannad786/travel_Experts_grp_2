var express = require('express');
var router = express.Router();
const mongo = require("mongodb").MongoClient;

//const url = "mongodb://localhost:27017";
//const url = "mongodb+srv://mo:comon123@cluster0.c2uhk.mongodb.net/test?authSource=admin&replicaSet=atlas-rvxm88-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true"
const uniqueValidator = require("mongoose-unique-validator");

function getPackages(pid, callback) {
  mongo.connect(MONGO_URL, {  // Create the DB connection
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
    (err, client) => {  // The callback will be called if the connection was succeded
      if (err) { throw err; }
      const db = client.db("userdata");  // get reference to the DB
      const collection = db.collection("packages"); // Get reference to the collection
      const query = {}    // Empty query to get all data
      if (pid) query.packid = parseInt(pid);  // If you need certain product
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

// const packages = [
//   id

// packid:
// "1"
// packname
// :
// "Malvdives Selight"
// imgpath
// :
// "/images/cub-1.jpg"
// packprice
// :
// "$4000"


/* GET all packages listing. */
router.get('/', function (req, res, next) {
  // Read the packages list from the DB
  getPackages(null, // null => get all packages
    function (err, packdata) { // Callback function, will be called when the data from the DB is ready
      if (err) throw err
      // Render the PUG template with the product data we got from the DB
      res.render('packages', {
        mypackages: packdata
      });
    }
  );
});

/* GET one product listing. */
router.get('/details/:packid', function (req, res, next) {
  const packid = req.params.packid
  getPackages(packid,
    function (err, data) {
      if (err) throw err
      res.render('packages', {
        mypackages: data,
        isdetails: true
      });
    }
  );
});

module.exports = router;
