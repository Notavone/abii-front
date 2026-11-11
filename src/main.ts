import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { enableNativeFeel } from './app/features/native-feel';

if (environment.production) {
  enableProdMode();
}

enableNativeFeel();

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
