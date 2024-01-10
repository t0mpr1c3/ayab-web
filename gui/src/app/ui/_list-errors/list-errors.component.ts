import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthMachineService } from '../../services/auth-machine/auth-machine.service';

@Component({
  standalone: true,
  selector: 'app-list-errors',
  templateUrl: './list-errors.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class ListErrorsComponent implements OnInit, OnDestroy {
  errors$: Observable<string[]>;
  unsubscribe$: Subject<void> = new Subject();

  constructor(private _authMachineService: AuthMachineService) {}

  ngOnInit() {
    //this.errors$ = this._authMachineService.authState$.pipe(map(state => state.context.errors));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
