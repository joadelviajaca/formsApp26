import { Component, inject } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-dinamicos-component',
  imports: [ReactiveFormsModule],
  templateUrl: './dinamicos-component.html',
})
export class DinamicosComponent {

  fb: FormBuilder = inject(FormBuilder);
  newFavorite: FormControl = this.fb.control('', Validators.required);

  public myForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favorites: this.fb.array([
      ['Metal Gear', [Validators.required]],
      ['Death Stranding', [Validators.required]]
    ])
  });

  get favorites() {
    return this.myForm.get('favorites') as FormArray;
  }

  isValidField(field: string): boolean | null {
    return (this.myForm.get(field)?.errors
      && this.myForm.get(field)?.touched) || null
  }

  getFieldError(field: string): string | null {
    if (!this.myForm.get(field)) return null
    const errors = this.myForm.get(field)?.errors || {}
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido'
        case 'minlength':
          return "Debe tener mínimo 3 letras"
        default:
          return null
      }
    }
    return null
  }

  isValidFieldInArray(formArray: FormArray, i: number) {
    return formArray.controls[i].errors
      && formArray.controls[i].touched
  }

  getArrayFieldError(formArray: FormArray, i: number): string | null {
    if (!formArray) return null

    const errors = formArray.controls[i].errors || {}

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido'
        case 'minlength':
          return "Debe tener mínimo 3 letras"
        default:
          return null
      }
    }
    return null
  }

  onDeleteGame(i: number) {
    this.favorites.removeAt(i)
  }

  add() {
    if (this.newFavorite.valid) {
      this.favorites.push(
        this.fb.control(
          this.newFavorite.value, Validators.required
        )
      )
      this.newFavorite.reset()
    }
  }

  submit() {
    if (this.myForm.invalid) {
      console.log(this.myForm.errors)
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
    (this.myForm.controls['favorites'] as FormArray) = this.fb.array([]);
    this.myForm.reset();
  }

}
