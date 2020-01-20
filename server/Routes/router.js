const express = require("express");
const router = express.Router();
var CityList = require("../Models/citySchema");
let cityData;
let cityList;

//@type                      POST
//@route                    /cities
//@description              This route is for posting citydata to MongoDb
//@access                   Public

router.post("/cities", async (req, res) => {
  try {
      const requestData = await req.body.data;
      requestData.map(cities => {
          cityData = cities.location;
          cityList = new CityList({
            cityName: cities.location
          });
          let response = await cityList.save().then();
        });
        console.log(response);
  } catch (err) {
    console.log(err);
  }
});


//@type                      GET
//@route                    /cities
//@description              This route is for fetching city data
//@access                   Public

router.get("/cities", async (req, res) => {
    try {
      const responses = await citylists.find();
      res.send(responses);
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
    }
  });


module.exports = router;
