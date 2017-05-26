import { Pipe, PipeTransform, Inject } from '@angular/core';
import { SortService} from './sort.service';

@Pipe({name: 'sort', pure: false})
export class SortPipe implements PipeTransform {
    constructor(@Inject(SortService) private sortService:SortService) {
        
    }
    transform(value: any): any {
        return this.sortService.sort(value);
    }
}