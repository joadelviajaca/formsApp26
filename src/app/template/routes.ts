import { Route } from "@angular/router";
import { BasicosComponent } from "./basicos-component/basicos-component";
import { DinamicosComponent } from "./dinamicos-component/dinamicos-component";
import { SwitchesComponent } from "./switches-component/switches-component";

export const TEMPLATE_ROUTES: Route[] = [
    { path: 'basicos', component: BasicosComponent },
    { path: 'dinamicos', component: DinamicosComponent },
    { path: 'switches', component: SwitchesComponent },
];
