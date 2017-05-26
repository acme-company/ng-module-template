import { Component } from '@angular/core';
import { SortService } from "../../../src/sort.service";

export interface Person {
  firstName:string;
  lastName: string;
}

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  providers: [SortService]
})
export class AppComponent { 
  name = 'Angular';
  people: Array<Person> = [];
  constructor(public sortService:SortService) {
    this.people = [
      { firstName: 'James', lastName: 'Dean'},
      { firstName: 'John', lastName: 'Smith'},
      { firstName: 'Jane', lastName: 'Doe'},
      { firstName: 'Terry', lastName: 'Rundle'},
      { firstName: 'Barry', lastName: 'White'},
    ];
  } 
}
