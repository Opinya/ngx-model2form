import { Observable } from 'rxjs/Observable';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import 'rxjs/add/operator/map';
export declare function ToNgForm<T>(this: Observable<T>, additionalControls?: any, validators?: any): Observable<FormGroup | FormArray | FormControl>;
declare module 'rxjs/Observable' {
    interface Observable<T> {
        toNgForm: typeof ToNgForm;
    }
}
