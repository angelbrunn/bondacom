var Weather = require('../models/weather');

// Obtiene todos los objetos Weather de la base de datos
const getWeather = (req, res) =>{
	Weather.find({},
		(err, Weather) => {
			console.log(Weather);
			console.log(err);
			if (err)
				res.send(err)
					res.json(Weather); // devuelve todas las Weathers en JSON		
				}
			);
}

// Guarda un objeto Weather en base de datos
const setWeather = function(req, res) {
	console.log(req);
		// Creo el objeto Weather
		Weather.create(
			{name : req.body.name,tCurrent: req.body.tCurrent, humidity: req.body.humidity,condition: req.body.condition,tempMax: req.body.tempMax,tempMin: req.body.tempMin}, 
			(err, Weather) => {
				if (err)
					res.send(err);
				// Obtine y devuelve todas las Weathers tras crear una de ellas
				Weather.find((err, Weather) => {
				 	if (err)
				 		res.send(err)
				 	res.json(Weather);
				});
			});

	}

module.exports = {
	getWeather : getWeather,
	setWeather : setWeather
}

