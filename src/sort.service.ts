import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

export interface SortParameter {
    name: string;
    asc: boolean;
}

@Injectable()
export class SortService {
    parameters: SortParameter[];
    clearEvent:Subject<string>;
    public onClear$: Observable<string>;
    constructor() {
        this.parameters = [];
        this.clearEvent = new Subject<string>();
        this.onClear$ = this.clearEvent.asObservable();
    }
    orderBy(parameter: SortParameter, preserve:boolean) {
        var parm = this.parameters.find(t => t.name == parameter.name);
        if (!parm)
            this.parameters.push(parameter);
        else
            parm.asc = parameter.asc;

        if (!preserve) {
            this.parameters
                .filter(t=> t!= (parm || parameter))
                .forEach(t=> this.clear(t.name));
        }
    }

    clear(name: string) {
        var parmIndex = this.parameters.findIndex(t => t.name == name);
        if (parmIndex >= 0) {
            var parm = this.parameters.splice(parmIndex, 1);
            this.clearEvent.next(parm[0].name);
        }
    }

    sort(array: Array<any>): Array<any> {

        return array.sort((a, b) => {
            var result = 0;
            this.parameters.forEach((parm) => {
                if (result == 0) {
                    var factor = parm.asc ? 1 : -1;
                    var aa = a[parm.name];
                    var bb = b[parm.name];
                    if (aa < bb) {
                        result = -1 * factor;
                    }
                    if (aa > bb) {
                        result = 1 * factor;
                    }
                }
            });
            return result;
        });
    }
}