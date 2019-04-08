import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { Observable } from 'rxjs';
import { ngDestroySubscription } from 'take-until-ng-destroy';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


declare module 'rxjs/internal/Observable' {
  interface Observable<T> {
    takeUntilNgDestroy: typeof ngDestroySubscription;
  }
}

Observable.prototype.takeUntilNgDestroy = ngDestroySubscription;
