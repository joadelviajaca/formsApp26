import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos-component',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './basicos-component.html',
})
export class BasicosComponent {
  private fb: FormBuilder = inject(FormBuilder);

  //   public myForm : FormGroup = new FormGroup({
  //     product: new FormControl('', [Validators.required, Validators.minLength(3)]),
  //     price: new FormControl(0, [Validators.required, Validators.min(0)]),
  //     stock: new FormControl(0, [Validators.required, Validators.min(1)])
  // })

  public myForm: FormGroup = this.fb.group({
    product: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(1)]]
  })

  isValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched
  }

  getFieldError(field: string): string | null {
    if (!this.myForm.controls[field]) return null
    const errors = this.myForm.controls[field].errors || {}
    console.log(errors)
    for(const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return `El campo ${field} es requerido`;

        case 'minlength':
          // Angular devuelve: { requiredLength: X, actualLength: Y }
          return `Debe tener mínimo ${errors['minlength'].requiredLength} caracteres`;

        case 'maxlength':
          // Angular devuelve: { requiredLength: X, actualLength: Y }
          return `Debe tener máximo ${errors['maxlength'].requiredLength} caracteres`;

        case 'min':
          // Angular devuelve: { min: X, actual: Y }
          return `El valor mínimo es ${errors['min'].min}`;

        case 'max':
          // Angular devuelve: { max: X, actual: Y }
          return `El valor máximo es ${errors['max'].max}`;
        default:
          return null
      }
    }
    return null
  }

  submit() {
    if (this.myForm.valid) {
      console.log("Se ha enviado el formulario")
    }
  }

}
