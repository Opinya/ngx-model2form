import { Component, Input } from '@angular/core';
import { FormGroup, FormArray, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})

export class PersonComponent {
  @Input() person: FormGroup;

  get childrenNames(): string[] {
    const children = this.person.get('childrenNames') as FormArray;
    const value = children.value;
    return Object.keys(value).map(key => value[key]);
  }

}
