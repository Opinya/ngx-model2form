# ngx-model2form
A RxJS operator to map a model entity to its equivalent Angular form entity.

## Breaking Change

Notice the addition of a selector function for validators.

## Installing

```
npm install --save ngx-model2form
```

And import to your main application module

```
import 'ngx-model2form';
```

You are ready to use the RxJS custom operator.

## Usage

Assuming ```this.people$``` is a stream of people, represented by the model:

```
interface Person {
  name: string;
  height: number;
  hobbies: string[];
}
```

Chaining the operator with the stream:

```
this.peopleForm$ = this.people$.toNgForm();
```

results with a stream of FormGroup with a structure simillar to the originated Person model.

This stream can be passes through a component input to transform into the underlying FormGroup,
and benefit of the component's change detector.

### Validators

Validators are passed through a selector function. The returned value determines the validators for the form, and is given the current model as parameter.

```
this.people$.toNgForm((person: Person) => ({
  height: person.height > 193
}));
```

You can pass validator/s as-is (for primitives) or an object, reflecting the structure of your model.

#### Primitives: 

```
this.people$.toNgForm(_ => Validators.required);
this.people$.toNgForm(_ => [Validators.min(0), Validators.max(9)]);
```

#### Object:

Assuming you model structure is: 

```
interface Person {
  name: string;
  height: number;
  hobbies: string[];
}
```

The opearator can be run as follows:

```
this.people$.toNgForm(_ => ({
  name: Validators.required,
  height: [Validators.min(0), Validators.max(9)]]
}));
```

* Notice that the ```hobbies``` property is missing, and thus will be omitted from validation.

##### Array property

Array property can be passed a simple validator/s to validate every item in the list, or an object with index key/s to validate a single or specific items.

Validating the whole array with a validation set: 

```
this.people$.toNgForm(_ => ({
  hobbies: [Validators.min(0), Validators.max(9)]
}));
```

Validating specific items:

```
this.people$.toNgForm(_ => ({
  hobbies: {
    "0": [Validators.min(0), Validators.max(9)],
    "3": Validators.required
  }
}));
```

## Planned features
* Include model properties: Only transform properties that are mentioned in the include entity into form entities. Keep other properties as they are.
* Exclude model properties: Omit transforming properties that are mentioned in the exclude entity into form entities. Keep transforming other properties into form entities.

## Running the tests

No tests available at the moments. Working to get it done.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [releases on this repository](https://github.com/Opinya/ngx-model2form/releases). 

## Authors

* **Chen Eshchar** - [ChenOpinya](https://github.com/chenopinya)

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/Opinya/ngx-model2form/blob/master/LICENSE) file for details

