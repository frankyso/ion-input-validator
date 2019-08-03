import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonFormValidatorDirective } from './ion-form-validator.directive';

@NgModule({
  declarations: [IonFormValidatorDirective],
  exports: [IonFormValidatorDirective],
  imports: [
    CommonModule
  ]
})
export class IonFormValidatorModule { }
