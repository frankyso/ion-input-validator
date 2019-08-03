# IONIC Form Validator



## Getting Started

clone this repo into your project and import ``IonFormValidatorModule`` into your page module

## Implementation
### HTML Template

Include your directive into the same tag with ``[FormGroup]``

```
    <form [formGroup]="validator" formGroupValidator>
        <div class="ion-padding-vertical">
```

### On Ts File
```
    public validator = this.formBuilder.group({
    username: ['', [ValidationService.required]],
    password: ['', [
        ValidationService.required, 
        ValidationService.startsWith("08")
    ]]
  });
```

## Available Validation Method
### required
The field under validation must be present in the input data and not empty.

### alpha_num
The field under validation must be entirely alpha-numeric characters.

### password
The field under validation must be 6 or more character and must include numeric character.

### confirmed
The field under validation must have a matching field of ``foo_confirmation``. For example, if the field under validation is password, a matching ``password_confirmation`` field must be present in the input.

### email
The field under validation must be formatted as an e-mail address.

### unique

### numeric
The field under validation must be numeric.

### phone
The field under validation must be formatted as an phone number.

### min
The field under validation must have a minimum value. Strings, numerics, arrays, and files are evaluated in the same fashion as the size rule.

### max
The field under validation must be less than or equal to a maximum value. Strings, numerics, arrays, and files are evaluated in the same fashion as the size rule.

### minlength
The field under validation must be more than specified value

### startsWith
The field under validation must start with one of the given values.


## Authors

* **Franky So** - *Initial work*

See also the list of [contributors](https://github.com/frankyso/ion-input-validator/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments
* This validator inspired by Laravel Validator.
* Based On Angular Reactive Form Module
* etc
