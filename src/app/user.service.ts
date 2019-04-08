import { Injectable, OnDestroy } from '@angular/core';
import { interval } from 'rxjs';
import { takeUntilNgDestroy } from 'take-until-ng-destroy';

@Injectable()
export class UserService implements OnDestroy {

  constructor() {
    interval(1000)
      .pipe(takeUntilNgDestroy(this))
      .subscribe({
        next(val) { console.log('user service - ', val); },
        complete() { console.log('user service - destroyed'); }
      });
  }

  ngOnDestroy() {}
}
