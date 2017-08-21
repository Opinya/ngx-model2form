import { Observable } from 'rxjs/Observable';
import { FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import 'rxjs/add/operator/map';

export type FormEntity = FormGroup | FormArray | FormControl;
export type Primitive = string | number | boolean;
export type Entity = Primitive | Object | Object[] | Primitive[];

declare module 'rxjs/Observable' {
    interface Observable<T> {
        toNgForm<T>(
            this: Observable<T>,
            validators?: {} | ValidatorFn[] | ValidatorFn
        ): Observable<FormEntity>;
    }
}

function primitiveToFormControl(primitive: string | number | boolean, validators: ValidatorFn[] | ValidatorFn) {
    return new FormControl(primitive, validators);
}

function objectToFormGroup(object: Object, validators: {}): FormGroup {
    return new FormGroup(
        Object.keys(object).reduce((group: {[key: string]: FormEntity}, prop: string) => {
            group[prop] = entityToFormEntity(object[prop], validators && validators[prop]);
            return group;
        }, {})
    );
}

function entityToFormEntity(entity: Entity, validators: {} | ValidatorFn[] | ValidatorFn): FormEntity {
    if (typeof entity === 'object') {
        if (entity.hasOwnProperty('length')) {
            return new FormArray((entity as any[]).map((item, index) => entityToFormEntity(
                item, 
                (typeof item !== 'object') && (typeof validators === 'object') && !Array.isArray(validators) ? validators[index] : validators 
            )));
        } else {
            return objectToFormGroup(entity, validators);
        }
    } else {
        return primitiveToFormControl(entity, validators as (ValidatorFn[] | ValidatorFn));
    }
}

function toNgForm<T>(
    this: Observable<T>,
    validators?: {} | ValidatorFn[] | ValidatorFn
): Observable<FormEntity> {
    return this.map((model: T) => entityToFormEntity(model, validators));
}

Observable.prototype.toNgForm = toNgForm;
