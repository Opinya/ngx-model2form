import { Component, Input } from '@angular/core';
import { FormGroup, FormArray, AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})

export class PersonComponent {
  @Input() person: FormGroup;

  get childrenNames(): FormControl[] {
    const children = this.person.get('childrenNames') as FormArray;
    return children.controls as FormControl[];
    // const value = children.value;
    // return Object.keys(value).map(key => value[key]);
  }

}
