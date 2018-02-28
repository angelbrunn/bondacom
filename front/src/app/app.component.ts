import { Component } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { Weather } from './models/weather';
import {TranslateService} from 'ng2-translate';


//Por default dejamos el español
const defaultLanguage = "es";
//Y como adicional el ingles
const additionalLanguages = ["en"];
//Combinamos las traducciones disponibles al default.
const languages: string[] = [defaultLanguage].concat(additionalLanguages);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  KeyComponent = 'Home.';
  weather = new Weather;
  public days;
  urlIco:String;
   

constructor(private weatherService: WeatherService,private translate: TranslateService) {
  this.days = new Array<any>();
}

ngOnInit() {
  //Trae informacion de la temperatura actual al iniciar el componente
  this.getCurrentCity();
  //Trae informacion de la temperatura historica de 1 dia al iniciar el componente
  this.getForecastWeatherCity();
  //Asignamos el lenguaje predefinido y los disponibles
  this.translate.setDefaultLang(defaultLanguage);
  this.translate.addLangs(additionalLanguages);
  //Nos basamos en el lenguaje del navegador para cambiar el lenguaje
  let initLang = this.translate.getBrowserLang();
    if (languages.indexOf(initLang) === -1) {
          initLang = defaultLanguage;
        }
  //En base a lo anterior asignamos el lenguaje a usar
  this.translate.use(initLang);
}

//1- El clima actual de la ciudad de Buenos Aires.
getCurrentCity(){
  this.weatherService.getCurrentWeather().subscribe(
    data => {
      console.log(data)
      this.weather.name = data.location.name;
      this.weather.tCurrent = data.current.temp_c;
      this.weather.humidity = data.current.humidity;
      
      this.weather.condition = this.KeyComponent + data.current.condition.text;

      //Guardo el icono para mostrarlo
      this.urlIco = data.current.condition.icon;
    },
    error => alert(error),
    () => console.log("finished")
  );
}

//2- La temperatura mínima y la máxima de las últimas 24hs.
getForecastWeatherCity(){
  this.weatherService.getForecastWeather().subscribe(  
    data => {
      console.log(data.forecast.forecastday)
      this.days = data.forecast.forecastday;
    },
    error => alert(error),
    () => console.log("finished")
  );
  }

  //3.-Save objeto del dominio
  saveWeatherCity(){
    console.log(this.weather)
    console.log("entro al saveWeatherCity")
    this.weatherService.setWeather(this.weather).subscribe(
      data => this.weather = data,
      error => console.log(error)
    )
  }
}