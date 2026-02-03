import { Component, inject, ViewChild, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PersonaS } from '../../interfaces';
import { SwalComponent, SwalDirective } from '@sweetalert2/ngx-sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-switches-component',
  imports: [FormsModule, SwalComponent, SwalDirective],
  templateUrl: './switches-component.html',
})
export class SwitchesComponent {
  
  private router : Router = inject(Router);

  @ViewChild('swalSuccess') swalSucces !: SwalComponent;
  @ViewChild('confirmDialog') confirmDialog !: SwalComponent;

  person: PersonaS = {
    genre: 'F',
    notifications: true
  }

  terms: boolean = false;

  
  async submit(){
    const answer = await this.confirmDialog.fire();
    console.log(answer)
    if (!answer.isConfirmed) return;

    this.swalSucces.fire();
    this.router.navigateByUrl('/')

  }
}
