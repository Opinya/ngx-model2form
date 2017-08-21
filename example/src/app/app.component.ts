import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Person, gender } from './models/person.model';
import 'ngx-model2form';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    peopleForm$: Observable<FormGroup>;
    people$: BehaviorSubject<Person>;
    private people = [
        {
            name: 'Chen Eshchar',
            address: {
                houseNumber: 42,
                streetName: 'My Street',
                city: 'A City'    
            },
            gender: 'male' as gender,
            height: 193,
            birthdate: 11923529499,
            childrenNames: ['Hansel', 'Gretel', 'Sheftel'],
            hobbies: ['Programming', 'Volleyball']
        },
        {
            name: 'Tom Eshchar',
            address: {
                houseNumber: 78,
                streetName: 'Some Street',
                city: 'Another City'    
            },
            gender: 'male' as gender,
            height: 185,
            birthdate: 11924929499,
            childrenNames: ['Ammi', 'Tammi']
        }
    ]
    
    ngOnInit() {
        this.people$ = new BehaviorSubject<Person>(this.people[0])
        this.peopleForm$ = this.people$
            .toNgForm<Person>({
                name: Validators.required,
                height: [Validators.min(100), Validators.max(240)],
                address: {
                    city: Validators.required
                },
                childrenNames: {
                    "1": Validators.required
                },
                hobbies: [Validators.required, Validators.maxLength(11)]
            }) as Observable<FormGroup>;
    }

    changePerson(personIndex) {
        this.people$.next(this.people[personIndex]);
    }
}