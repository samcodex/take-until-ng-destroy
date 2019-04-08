import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export interface IOnDestroy {
  ngOnDestroy: () => void;
  ___autoDestroy?: {
    $notifier?: Observable<any>;
  };
}

export function ngDestroySubscription<T>(this: Observable<T>, ngInstance: IOnDestroy): Observable<T> {
  if (!ngInstance.hasOwnProperty('___autoDestroy')) {
    ngInstance.___autoDestroy = {};
  }
  if (!ngInstance.___autoDestroy.hasOwnProperty('$notifier')) {
    ngInstance.___autoDestroy.$notifier = createNotifier(ngInstance);
  }

  const notifier = ngInstance.___autoDestroy.$notifier;
  const destroyableObservable = this.pipe(takeUntil(notifier));

  // destroyableObservable.subscribe({
  //   complete() { console.log('destroyableObservable is completed'); }
  // });

  return destroyableObservable;
}

function createNotifier(ngObject: IOnDestroy): Observable<any> {
  const ngOnDestroy = ngObject.ngOnDestroy;
  const triggerNotifier = new Subject();

  ngObject.ngOnDestroy = function () {
    ngOnDestroy.apply(ngObject);

    triggerNotifier.next();
    triggerNotifier.complete();

    delete ngObject.___autoDestroy.$notifier;
  };

  return triggerNotifier.asObservable();
}
