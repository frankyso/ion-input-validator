import { AbstractControl, ValidatorFn, FormGroup } from '@angular/forms';
export class ValidationService {
    static getValidatorErrorMessage(validatorName: string, validatorValue?: any, prettyName?: string) {
        let config = {
            'alpha': `${prettyName} Hanya boleh berisi huruf`,
            'required': `${prettyName} Tidak boleh kosong`,
            'alpha_num': `${prettyName} Hanya boleh berisi huruf dan angka`,
            'password': `${prettyName} minimal 6 karakter, dan harus berisi angka`,
            'confirmed': `${prettyName} tidak cocok`,
            'email': `${prettyName} Tidak valid`,
            'unique': `${prettyName} pernah terdaftar sebelumnya, silahkan gunakan ${prettyName} lain`,
            'numeric': `${prettyName} harus angka`,
            'phone': `${prettyName} tidak valid`,
            'min': `${prettyName} tidak boleh kurang dari ${validatorValue}`,
            'max': `${prettyName} tidak boleh lebih dari  ${validatorValue.requiredValue}`,
            'minlength': `Jumlah karakter ${prettyName} tidak boleh kurang dari ${validatorValue.requiredLength}`,
            'startsWith': `${prettyName} harus dimulai dari ${validatorValue}`,
        };

        return config[validatorName];
    }

    static alpha(control) {
        control.value = "" + control.value
        if (control.value.match(/^[A-Za-z]+$/)) {
            return null;
        } else {
            return { 'alpha': true };
        }
    }

    static required(control) {
        if (control.value.match(/./)) {
            return null;
        } else {
            return { 'required': true };
        }
    }

    static confirmed(control) {
        let controlName = ValidationService.getControlName(control);
        control.value = "" + control.value
        if (control.value !== "") {
            if (control.value == control.root.value[controlName.replace("Confirmation", "")]) {
                return null;
            } else {
                return { 'confirmed': true };
            }
        } else {
            return null;
        }
    }

    static alpha_num(control) {
        //     // Visa, MasterCard, American Express, Diners Club, Discover, JCB
        if (control.value.match(/^[a-zA-Z0-9]*$/)) {
            return null;
        } else {
            return { 'alpha_num': true };
        }
    }

    static email(control) {
        // RFC 2822 compliant regex
        if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null;
        } else {
            return { 'email': true };
        }
    }

    static password(control) {
        control.value = String(control.value);
        // {6,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
            return null;
        } else {
            return { 'password': true };
        }
    }

    static phone(control) {
        control.value = String(control.value);
        if (control.value.match(/^(0|[0-9][0-9]*)$/)) {
            return null;
        } else {
            return { 'numeric': true };
        }
    }

    static numeric(control) {
        control.value = String(control.value);
        if (control.value.match(/^(0|[1-9][0-9]*)$/)) {
            return null;
        } else {
            return { 'numeric': true };
        }
    }

    static min = (min: number): ValidatorFn => {
        return (control: AbstractControl): { [key: string]: any } => {
            if ((control.value || 0) < min) {
                return { 'min': min };
            }
            else {
                return null;
            }
        };
    };

    static max = (max: number): ValidatorFn => {
        return (control: AbstractControl): { [key: string]: any } => {
            if (control.value > max) {
                return { 'max': true, 'requiredValue': max };
            }
            else {
                return null;
            }
        };
    };

    /**
     * The field under validation must start with one of the given values.
     */
    static startsWith = (string: string): ValidatorFn => {
        return (control: AbstractControl): { [key: string]: any } => {
            if (!control.value.startsWith(string)) {
                return { 'startsWith': string };
            }
            else {
                return null;
            }
        };
    };


    // Helper
    static getControlName(control: AbstractControl): string | null {
        let group = <FormGroup>control.parent;
        if (!group) {
            return null;
        }
        let name: string;
        Object.keys(group.controls).forEach(key => {
            let childControl = group.get(key);

            if (childControl !== control) {
                return;
            }

            name = key;
        });

        return name;
    }
}