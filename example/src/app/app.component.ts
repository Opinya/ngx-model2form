import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { Person, gender } from './models/person.model';
import 'ngx-model2form';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    peopleForm$: Observable<FormGroup>;
    people$: BehaviorSubject<Person>;
    private persons = [
        {
            name: 'Chen Eshchar',
            address: {
                houseNumber: 42,
                streetName: 'My Street',
                city: 'A City'    
            },
            gender: 'male' as gender,
            height: 193,
            birthdate: new Date(2017, 2, 5),
            childrenNames: ['Hanzel', 'Grettel']
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
            birthdate: new Date(2015, 5, 7),
            childrenNames: ['Ammi', 'Tammi']
        }
    ]
    
    ngOnInit() {
        this.people$ = new BehaviorSubject<Person>(this.persons[0])
        this.peopleForm$ = this.people$
            .toNgForm<Person>() as Observable<FormGroup>
    }

    changePerson(personIndex) {
        this.people$.next(this.persons[personIndex]);
    }
}