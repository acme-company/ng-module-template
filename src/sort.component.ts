import { Component, OnInit, ElementRef } from '@angular/core';
import { SortService } from "./sort.service";

enum SortState {
    None = 0,
    Ascending = 1,
    Descending = 2

}

@Component({
    selector: '[sort]',
    templateUrl: './sort.component.html'
})
export class SortComponent implements OnInit {
    sortState: SortState;
    name: string;

    constructor(private sortService:SortService, private elementRef:ElementRef) {
        this.sortState = SortState.None;
        this.sortService.onClear$.subscribe((name:string)=>{
            if (this.name == name)
                this.sortState = SortState.None;
        });
     }

    ngOnInit() { 
        this.name = this.elementRef.nativeElement.getAttribute("sort");
    }

    toggleSortState() {
        this.sortState = <SortState>(this.sortState + 1)%3;
    }

    onSortClick($event) {
        this.toggleSortState();
        switch (this.sortState) {
            case SortState.Ascending:
               this.sortService.orderBy({ name: this.name, asc: true}, $event.ctrlKey);
               break;
            case SortState.Descending:
               this.sortService.orderBy({ name: this.name, asc: false}, $event.ctrlKey);
               break;
            case SortState.None:
               this.sortService.clear(this.name);
               break;
                
        }
    }

}