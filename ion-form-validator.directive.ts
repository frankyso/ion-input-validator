import { Directive, Input, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ValidationService } from './validation.service';

@Directive({
  selector: '[formGroupValidator]'
})
export class IonFormValidatorDirective {

  @Input('formGroup') formGroup: FormGroup;
  constructor(private el: ElementRef) {
    setTimeout(() => {
      this.el.nativeElement.querySelectorAll('[formControlName]').forEach((ionInput) => {
        // console.log(ionInput.parentNode);
        let errorContainer = document.createElement("div");
        errorContainer.setAttribute('class', 'error-container');

        // var node = document.createTextNode("This is new.");
        ionInput.parentNode.insertBefore(errorContainer, ionInput.nextSibling);

        let formcontrolname = ionInput.getAttribute('formcontrolname');
        let formControl = this.formGroup.controls[formcontrolname];
        let prettyName = ionInput.getAttribute('prettyName');
        formControl.valueChanges.subscribe((valuechanged) => {
          let ec = ionInput.parentNode.querySelector(".error-container");
          ec.innerHTML = "";
          if (formControl.dirty && formControl.invalid) {
            Object.keys(formControl.errors).forEach(function (key) {
              let errorString = ValidationService.getValidatorErrorMessage(key, formControl.errors[key], prettyName);
              ec.innerHTML = ec.innerHTML + `<div style="
              font-size: .8em; 
              color: var(--ion-color-danger); 
              margin-bottom: .5em;
              display: flex;" class="error-message">
                <ion-icon style="flex-shrink: 0; margin-right: 0.5em;" name="alert"></ion-icon>
                <div>${errorString}</div>
              </div>`;
            });
          }
        });
      }, 100);
    });
  }
}
