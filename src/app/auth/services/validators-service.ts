import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, ValidationErrors } from '@angular/forms';
import { map, Observable, switchMap, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ValidatorsService {

  private http: HttpClient = inject(HttpClient);
  private apiUrl = 'http://localhost:3001/auth/check-email';

  noSurname(control: FormControl): ValidationErrors | null {

    const value: string = control.value?.trim().toLowerCase();


    if (!value) return null;

    // Verificamos si cumple el patrón de dos palabras
    if (value.split(' ').length < 2) {
      return {
        noSurname: true // ❌ Error devuelto
      }
    }

    return null; // ✅ Todo correcto
  }

  cantBe(palabraProhibida: string) {

    // Retornamos la función validadora que Angular ejecutará
    return (control: FormControl): ValidationErrors | null => {

      const value: string = control.value?.trim().toLowerCase();

      if (value === palabraProhibida.toLowerCase()) {
        return {
          cantBe: true // ❌ Error: Contiene la palabra prohibida
        }
      }

      return null; // ✅
    };
  }

  // VALIDACIÓN ASÍNCRONA REAL
  // Usamos un getter o una función que devuelve el validador para poder inyectar dependencias
  validateEmail(): AsyncValidatorFn {

    return (control: AbstractControl): Observable<ValidationErrors | null> => {

      const email = control.value;

      // Si el campo está vacío, no validamos nada (dejamos que el 'required' actúe)
      if (!email) {
        return new Observable(observer => observer.next(null));
        // Ojo: Angular espera un Observable que se complete
      }

      // RxJS Pipe Mágico:
      // 1. timer(500): Espera 500ms. Si el usuario escribe antes, se reinicia.
      // 2. switchMap: Si había una petición anterior pendiente, la cancela y lanza la nueva.
      return timer(500).pipe(
        switchMap(() => {
          return this.http.post<{ isAvailable: boolean }>(this.apiUrl, { email });
        }),
        map(response => {
          console.log('Respuesta del servidor para email:', email, response);
          // Si isAvailable es true -> null (Sin errores)
          // Si isAvailable es false -> { emailTaken: true } (Error)
          return response.isAvailable ? null : { emailTaken: true };
        })
      );
    };
  }

  camposIguales(campo1: string, campo2: string) {

    return (formGroup: AbstractControl): ValidationErrors | null => {

      const pass1 = formGroup.get(campo1)?.value;
      const pass2 = formGroup.get(campo2)?.value;

      // Ojo: Esto valida a nivel de Formulario, pero queremos marcar el error en el input
      if (pass1 !== pass2) {
        formGroup.get(campo2)?.setErrors({ noEsIgual: true });
        return { noEsIgual: true }
      }

      // IMPORTANTE: Si corregimos, hay que quitar el error manualmente 
      // si es que ese campo no tiene otros errores.
      if (formGroup.get(campo2)?.hasError('noEsIgual')) {
        delete formGroup.get(campo2)?.errors?.['noEsIgual'];
        formGroup.get(campo2)?.updateValueAndValidity(); // Refrescar estado
      }

      return null;
    }
  }


}
