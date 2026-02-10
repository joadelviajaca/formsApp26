import { Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,SwalComponent],
  templateUrl: './login.html',
})
export class Login {

  private fb : FormBuilder = inject(FormBuilder);
  private router : Router = inject(Router);
  private authService = inject(AuthService);

  @ViewChild('swalSuccess') swalSucces !: SwalComponent;
  @ViewChild('swalError') swalError !: SwalComponent;

  loginForm : FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  login(){
    if (!this.loginForm.valid) {
        this.swalError.fire();
    }
    // Enviar al servidor
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
    .subscribe({
      next: response => {
        this.swalSucces.fire();
        this.router.navigateByUrl('/');

      },
      error: error => this.swalError.fire()
    })
  }

}
