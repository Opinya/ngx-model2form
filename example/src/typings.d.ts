import { FormGroup, ValidatorFn } from '@angular/forms';

/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

declare module 'rxjs/Observable' {
    interface Observable<T> {
        toNgForm<T>(
            validators?: {} | any[] | ValidatorFn,
            additionalControls?: any,
            postEdit?: (form: FormGroup) => FormGroup
        ): Observable<FormGroup>;
    }
}
