# ngx-model2form
A RxJS operator to map a model entity to its equivalent Angular (>=2) form entity.

## Installing

```
npm install --save ngx-model2form
```

And import to your main application module

```
import 'ngx-model2form';
```

You are ready to use the RxJS custom operator

## Usage

In component ngOnInit (assuming ```this.people$``` is a stream of people):

```
this.peopleForm$ = this.people$.toNgForm();
```

Which results with a stream of FormGroup with a structure simillar to the originated Person model.

This stream can be passes through a component input to transform into the underlying FormGroup.


### Validators

You can pass validator/s as-is (for primitives) or an object, reflecting the structure of your model.

#### Primitives: 

```
this.people$.toNgForm(Validators.required);
this.people$.toNgForm([Validators.min(0), Validators.max(9)]);
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
this.people$.toNgForm({
  name: Validators.required,
  height: [Validators.min(0), Validators.max(9)]]
});
```

* Notice that the ```hobbies``` property is missing, and thus will be omitted from validation.

##### Array property

Array property can be passed a simple validator/s to validate every item in the list, or an object with index key/s to validate a single or specific items.

Validating the whole array with a validation set: 

```
this.people$.toNgForm({
  hobbies: [Validators.min(0), Validators.max(9)]
});
```

Validating specific items:

```
this.people$.toNgForm({
  hobbies: {
    "0": [Validators.min(0), Validators.max(9)],
    "3": Validators.required
  }
});
```

## Running the tests

No tests available at the moments. Working to get it done.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [releases on this repository](https://github.com/Opinya/ngx-model2form/releases). 

## Authors

* **Chen Eshchar** - [ChenOpinya](https://github.com/chenopinya)

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/Opinya/ngx-model2form/blob/master/LICENSE) file for details

