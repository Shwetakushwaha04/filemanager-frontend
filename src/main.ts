import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent as App } from './app/app';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

import { importProvidersFrom } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpErrorInterceptor } from './app/services/http-error-interceptor';

bootstrapApplication(App, {
  providers: [provideRouter(routes),
    provideHttpClient(
      withInterceptors([httpErrorInterceptor])
    )
  ],
});
