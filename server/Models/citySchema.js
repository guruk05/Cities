const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema for MovieList updation

const cityList = new Schema({
                cityName: String
});


module.exports = cityLists = mongoose.model("cityList", cityList);