import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideSweetAlert2 } from '@sweetalert2/ngx-sweetalert2';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideSweetAlert2({
            // Optional configuration
            fireOnInit: false,
            dismissOnDestroy: true,
        }),
    provideHttpClient()
    
  ]
};
