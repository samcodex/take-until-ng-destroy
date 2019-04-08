import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval } from 'rxjs';
import { UserService } from './../user.service';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css'],
  providers: [ UserService ]
})
export class Page2Component implements OnInit, OnDestroy {

  constructor(
    private userService: UserService
  ) { }

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
