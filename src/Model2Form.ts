import { Observable } from 'rxjs';
import { FormGroup, FormArray, FormControl } from '@angular/forms';

export function model2form<T>(
    this: Observable<T>, 
    additionalControls: any, 
    validators: any
): Observable<FormGroup | FormArray | FormControl> {
  return this.map(model => new FormGroup({
      someControl: new FormControl(42)
  }));
}

Observable.prototype.model2form = model2form;

declare module 'rxjs/Observable' {
  interface Observable<T> {
    model2form: typeof model2form;
  }
}