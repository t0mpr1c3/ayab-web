import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// sends message when Test menu option is selected
@Injectable({ providedIn: 'root' })
export class StartTestingService {
  public startTesting = new Subject<void>();

  public emit() {
    this.startTesting.next();
  }
}