import { Component, inject, ViewChild } from '@angular/core';
import { PersonaS } from '../../interfaces';
import { FormsModule } from '@angular/forms';
import { SwalComponent, SwalDirective } from '@sweetalert2/ngx-sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-switches-component',
  imports: [FormsModule, SwalComponent, SwalDirective],
  templateUrl: './switches-component.html',
})
export class SwitchesComponent {

  @ViewChild('swalSuccess') swalSuccess!: SwalComponent;
  @ViewChild('confirmDialog') confirmDialog!: SwalComponent;

  private router : Router = inject(Router);

  person: PersonaS = {
    genre: 'F',
    notifications: true
  }

  terms: boolean = false;

  async submit(){
    // console.log('Se ha enviado el formulario');
    const result = await this.confirmDialog.fire();
    if(!result.isConfirmed) return;
    this.swalSuccess.fire();
    this.router.navigateByUrl('/');

  }

}
