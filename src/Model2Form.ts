import { Observable } from 'rxjs/Observable';
import { FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import 'rxjs/add/operator/map';

export type FormEntity = FormGroup | FormArray | FormControl;

declare module 'rxjs/Observable' {
    interface Observable<T> {
        toNgForm<T>(
            validators?: {} | ValidatorFn[] | ValidatorFn,
            additionalControls?: any,
            postEditing?: (form: FormEntity) => FormEntity
        ): Observable<FormEntity>;
    }
}

function primitiveToFormControl(primitive: string | number | boolean, validators: ValidatorFn[] | ValidatorFn) {
    const control = new FormControl(primitive);
    if (validators) {
        control.setValidators(validators);
    }
    return control;
}

function objectToFormGroup(object: Object, validators: {}): FormGroup {
    return new FormGroup(
        Object.keys(object).reduce((group, prop: string) => {
            group[prop] = entityToFormEntity(object[prop], validators && validators[prop]);
            return group;
        }, {})
    );
}

function entityToFormEntity(entity: string | number | boolean | Object | any[], validators: {} | ValidatorFn[] | ValidatorFn) {
    if (typeof entity === 'object') {
        return objectToFormGroup(entity, validators);
    } else if (Array.isArray(entity)) {
        return new FormArray(entityToFormEntity(entity, validators));
    } else {
        return primitiveToFormControl(entity, validators as (ValidatorFn[] | ValidatorFn));
    }
}

function toNgForm<T>(
    this: Observable<T>,
    validators?: {} | any[] | ValidatorFn,
    additionalControls?: any,   
    postEdit?: (form: FormEntity) => FormEntity
): Observable<FormEntity> {
    return this.map((model: T) => entityToFormEntity(model, validators));
}

Observable.prototype.toNgForm = toNgForm;
