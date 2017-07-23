import { Observable } from 'rxjs/Observable';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import 'rxjs/add/operator/map';

declare module 'rxjs/Observable' {
    interface Observable<T> {
        toNgForm: typeof toNgForm;
    }
}

export function toNgForm<T>(
    this: Observable<T>, 
    additionalControls?: any, 
    validators?: any
): Observable<FormGroup | FormArray | FormControl> {
    return this.map(model => new FormGroup(
        Object.keys(model).reduce((group, prop: string) => {
            group[prop] = new FormControl(model[prop]);
            return group;
        }, {})
    ));
}

Observable.prototype.toNgForm = toNgForm;
