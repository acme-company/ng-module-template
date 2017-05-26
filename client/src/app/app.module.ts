import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { AppModule as MyModule } from '../../../src/app.module';

@NgModule({
  imports:      [ BrowserModule, MyModule.forRoot() ],
  declarations: [ AppComponent ],
  
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
