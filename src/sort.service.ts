import { Injectable } from '@angular/core';

export interface SortParameter {
    name: string;
    asc: boolean;
}

@Injectable()
export class SortService {
    parameters: Array<SortParameter> = [];
    orderBy(parameter: SortParameter) {
        var parm = this.parameters.find(t => t.name == parameter.name);
        if (!parm)
            this.parameters.push(parameter);
        else
            parm.asc = parameter.asc;

    }

    clear(name: string) {
        var parmIndex = this.parameters.findIndex(t => t.name == name);
        if (parmIndex >= 0) {
            this.parameters.splice(parmIndex, 1);
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