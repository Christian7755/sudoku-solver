import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// Prod-Mode aktivieren, wenn environment.production = true
if (environment.production) {
  enableProdMode();
  console.log('Der Prod-Mode wurde enabled');
} else {
  console.log('Es handelt sich um Developer-Mode');
}

// Anwendung starten
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(() => console.log('Bootstrap completed'))
  .catch(err => console.error(err));
