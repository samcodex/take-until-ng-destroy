import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subject, of } from 'rxjs';
import { takeUntilNgDestroy } from 'take-until-ng-destroy';
import { map, takeUntil, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit() {
    const notifier = new Subject();
    const other = of(null);

    interval(1000)
      .pipe(
        takeUntilNgDestroy(this),
        takeUntil(notifier),
        map(v => v * 10),
        mergeMap(() => other)
      )
      .subscribe({
        next(val) { console.log('page1 - ', val); },
        complete() { console.log('page1 - destroyed'); }
      });
  }

  ngOnDestroy() {}
}
