# take-until-ng-destroy

Unsubscribe subscriptions when the component or service is destroyed

## Features
1. Type checking to make sure the interface <b>ngOnDestroy</b> is implemented
2. Using observable pipe function to unsubscribe
3. Using observable prototype method to unsubscribe

## Installation
npm install take-until-ng-destroy --save

----
## Usage

### **Using observable pipe function**

* import pipe function 'takeUntilNgDestroy'
```
import { takeUntilNgDestroy } from 'take-until-ng-destroy';
```
* use 'takeUntilNgDestroy' in Observable.pipe() method. Real time type checking to make sure the interface <b>ngOnDestroy</b> is implemented in the component or service.

```
@Component({
    ....
})
export class Page1Component implements OnDestroy {

  constructor() { }

  ngOnInit() {
    interval(1000)
      .pipe(takeUntilNgDestroy(this))
      .subscribe({
        next(val) { console.log('page1 - ', val); },
        complete() { console.log('page1 - destroyed'); }
      });
  }

  ngOnDestroy() {}
}
```

### **Using observable prototype method**

* Add the following codes to the main code, such as main.ts

```
// import function ngDestroySubscription
import { ngDestroySubscription } from 'take-until-ng-destroy';
```

```
// Declare and add the prototype method 'takeUntilNgDestroy' to Observable
declare module 'rxjs/internal/Observable' {
  interface Observable<T> {
    takeUntilNgDestroy: typeof ngDestroySubscription;
  }
}

Observable.prototype.takeUntilNgDestroy = ngDestroySubscription;

```

* Use Observable method <b>takeUntilNgDestroy</b> directly. Real time type checking to make sure the interface <b>ngOnDestroy</b> is implemented in the component or service.
```
@Component({
  ...
})
export class Page2Component implements OnDestroy {

  constructor() { }

  ngOnInit() {
    interval(1000)
      .takeUntilNgDestroy(this)
      .subscribe({
        next(val) { console.log('page2 - ', val); },
        complete() { console.log('page2 - destroyed'); }
      });
  }

  ngOnDestroy() {}
}

```


----
## License
MIT
