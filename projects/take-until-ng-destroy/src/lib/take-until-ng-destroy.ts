import { Observable, MonoTypeOperatorFunction } from 'rxjs';

import { ngDestroySubscription, IOnDestroy } from './ng-destroy-subscription';

export function takeUntilNgDestroy<T>(ngObject: IOnDestroy): MonoTypeOperatorFunction<T> {
  return (source: Observable<T> ) => ngDestroySubscription.call(source, ngObject);
}

// Observable prototype method
// declare module 'rxjs/internal/Observable' {
//   interface Observable<T> {
//     takeUntilNgDestroy: typeof ngDestroySubscription;
//   }
// }

// Observable.prototype.takeUntilNgDestroy = ngDestroySubscription;
