import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideSpammerinoApiClient } from '@api';

const API_URL = 'https://spammerino-api.vercel.app';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideSpammerinoApiClient({
      basePath: API_URL,
    }),
  ],
};
