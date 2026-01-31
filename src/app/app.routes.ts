import { Routes } from '@angular/router';
import { Home } from './home/home';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'template', loadChildren: () => import('./template/routes').then( m => m.TEMPLATE_ROUTES ) },
];
