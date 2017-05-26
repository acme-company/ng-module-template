import { Component } from '@angular/core';

export interface Person {
  firstName:string;
  lastName: string;
}

@Component({
  selector: 'app',
  templateUrl: './app.component.html'
})
export class AppComponent { 
  name = 'Angular';
  people: Array<Person> = [];
  constructor() {
    this.people = [
      { firstName: 'James', lastName: 'Dean'},
      { firstName: 'John', lastName: 'Smith'},
      { firstName: 'Jane', lastName: 'Doe'},
    ];
  } 
}
