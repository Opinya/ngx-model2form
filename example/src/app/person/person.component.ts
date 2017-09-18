import { Component, Input } from '@angular/core';
import { FormGroup, FormArray, AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})

export class PersonComponent {
  @Input() person: FormGroup;

  disabled(condition) {
    return condition ? 'disabled' : undefined;
  }

  get personValue() {
    return this.person.value;
  }

  get childrenNames(): FormControl[] {
    const children = this.person.get('childrenNames') as FormArray;
    return children.controls as FormControl[];
  }

  get hobbies(): FormControl[] {
    const hobbies = this.person.get('hobbies') as FormArray;
    return hobbies && hobbies.controls as FormControl[];
  }

  get addressGroupInvalid() {
    const address = this.person.get('address') as FormGroup;
    return address && address.invalid;
  }

}
