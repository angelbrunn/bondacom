var Weather = require('../models/weather');
var Controller = require ('../controllers/weatherController');
var path =  require('path');
module.exports = function(app) {

	// devolver weather
	app.get('/api/weather', Controller.getWeather);

	// Crear un nuevo weather | persistimos un objeto tipo weather
	app.post('/api/saveWeather', Controller.setWeather);
	
	// application 
	app.get('/', function(req, res) {
		res.sendFile(__dirname +'/dist/'+'index.html'); 
	});
	
};