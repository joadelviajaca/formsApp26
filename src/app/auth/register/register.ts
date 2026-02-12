import { Component, inject } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { ValidatorsService } from '../services/validators-service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './register.html',
})
export class Register {

  private fb = inject(FormBuilder);
  private validatorsService = inject(ValidatorsService);
  

  myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, this.validatorsService.noSurname ]],
    email: ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$')], [ this.validatorsService.validateEmail() ]],
    login: ['', [ Validators.required, this.validatorsService.cantBe('joadelvia') ]],
    password: ['', [ Validators.required]],
    confirmPassword: ['', [ Validators.required]],
  }, {
    // 4. Validadores de Formulario (Cross-field)
    // Se definen en las opciones del grupo, no del control individual
    validators: [
      this.validatorsService.camposIguales('password', 'confirmPassword')
    ]
  })

  submit(){
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
  }

  invalidField(field: string): boolean | undefined {
    return this.myForm.get(field)?.invalid && this.myForm.get(field)?.touched;
  }

  get emailErrorMsg(): string {
    const errors = this.myForm.get('email')?.errors;
    if (errors?.['required']) {
      return 'El email es obligatorio';
    } else if (errors?.['pattern']) {
      return 'El formato de correo no es válido';
    } else if (errors?.['emailTaken']) {
      return 'Ese correo ya está en uso (Async check)';
    }
    return '';
  }

}
