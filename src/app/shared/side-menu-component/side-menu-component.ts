import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface MenuItem {
  texto: string;
  ruta: string;
}


@Component({
  selector: 'app-side-menu-component',
  imports: [RouterLink],
  templateUrl: './side-menu-component.html',
})
export class SideMenuComponent {
  templateMenu: MenuItem[] = [
    {
      texto: 'Básicos',
      ruta: './template/basicos'
    },
    {
      texto: 'Dinámicos',
      ruta: './template/dinamicos'
    },
    {
      texto: 'Switches',
      ruta: './template/switches'
    },
  ];

  reactiveMenu: MenuItem[] = [
    {
      texto: 'Básicos',
      ruta: './reactive/basicos'
    },
    {
      texto: 'Dinámicos',
      ruta: './reactive/dinamicos'
    },
    {
      texto: 'Switches',
      ruta: './reactive/switches'
    },
  ];

}
