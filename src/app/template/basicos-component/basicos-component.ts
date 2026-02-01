import { JsonPipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-basicos-component',
  imports: [FormsModule,JsonPipe],
  templateUrl: './basicos-component.html',
})
export class BasicosComponent {
  @ViewChild('myForm') myForm!: NgForm;

  notValidField(fieldName: string): boolean {
    return this.myForm?.controls[fieldName]?.invalid && this.myForm?.controls[fieldName]?.touched;
  }

  notValidPrice() {
    if (this.myForm?.controls['precio'].value < 0) { // Validación personalizada
        this.myForm.controls['precio'].setErrors({ precio: true }); // Añadimos el error
        return false;
    } else {
        this.myForm.controls['precio'].setErrors(null); // Eliminamos el error
        return true;
    }
}

  save( form: NgForm) {
    console.log(form);
    // Aquí iría la lógica para guardar el formulario
    // Reseteamos el formulario
    this.myForm.resetForm({
      producto: 'RTX 4090',
      precio: 1600,
      existencias: 10
    });
    }
}
