import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Http,HttpModule } from '@angular/http';
import { FormsModule} from '@angular/forms';
import { WeatherService } from './services/weather.service';
import { AppComponent } from './app.component';
import { TranslateModule,TranslateLoader, TranslateStaticLoader  } from 'ng2-translate';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: function(http: Http){ return new TranslateStaticLoader(http, '/assets/i18n', '.json') },
      deps: [Http]
  }), 
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
