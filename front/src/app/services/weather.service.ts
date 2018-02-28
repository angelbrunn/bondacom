import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import 'rxjs/add/operator/map'

@Injectable()
export class WeatherService {

    //URL consumir backend
    urlBack = 'http://localhost:5000';
    //URL consumir API.APIXU
    url = 'http://api.apixu.com/v1/current.json?key=09a1a04b52074a5a8d9142606181802';
    // URL Staticas solo a modo ejemplo | falta usar parameters
    url_a = 'http://api.apixu.com/v1/current.json?key=09a1a04b52074a5a8d9142606181802&q=Buenos Aires';
    url_b = 'http://api.apixu.com/v1/forecast.json?key=09a1a04b52074a5a8d9142606181802&q=Buenos Aires&days=1';


   constructor(private _http: Http, private requestOptions: RequestOptions) { }
   
   //Recupero de la db objeto del dominio | en este caso weather
   getWeather(){
    return this._http.get(this.urlBack +'/api/weather').map((response: Response) => response.json());
    }

    //Guardo en la db un objeto del dominio | en este caso weather
    setWeather(parameters){
        console.log(parameters);
        this.requestOptions.params = parameters;
        return this._http.post(this.urlBack  +'/api/saveWeather' ,this.requestOptions).map((response: Response) => response.json());
    }

   //Trae clima actual
    getCurrentWeather(){
    console.log('Entro a getCurrentWeather . . ');
    return this._http.get(this.url_a).map((response: Response) => response.json());
    }

    //Trae max y min clima historico 1 dia
    getForecastWeather(){
        console.log('Entro a getForecastWeather . . ');
        return this._http.get(this.url_b).map((response: Response) => response.json());
    }

}