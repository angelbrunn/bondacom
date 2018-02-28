var mongoose = require('mongoose');

let weathers_Schema  = new mongoose.Schema({
	id: Number,
	name: String,
	tCurrent: String,
	humidity: String,
	condition:String,
	tempMax: String,
	tempMin: String
}, { collection: 'weather' });

let Weather= mongoose.model('weather', weathers_Schema );

module.exports = Weather;