import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SortComponent} from './sort.component';
import { SortPipe} from './sort.pipe';
import { SortService } from "./sort.service";

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ AppComponent, SortComponent, SortPipe ],
  exports: [ AppComponent, SortComponent, SortPipe ],
  providers: [SortService]
})
export class AppModule {
   static forRoot() {
      return {
          ngModule: AppModule,
          providers: [],
      };
   }
}
