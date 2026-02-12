import { Routes } from '@angular/router';
import { Home } from './home/home';
import { authGuard } from './shared/guards/auth-guard';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'template', loadChildren: () => import('./template/routes').then( m => m.TEMPLATE_ROUTES ) },
    { path: 'reactive', loadChildren: () => import('./reactive/routes').then( m => m.REACTIVE_ROUTES ) },
    { path: 'auth', loadChildren: () => import('./auth/routes').then( m => m.AUTH_ROUTES)},
    { path: 'missions', loadComponent: () => import('./missions/missions').then( m => m.Missions ), canActivate: [ authGuard ] }
];
