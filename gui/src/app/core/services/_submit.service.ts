import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// sends message when cancel button is pressed
@Injectable({ providedIn: 'root' })
export class SubmitService {
  public submit$ = new Subject<void>();

  public emit() {
    this.submit$.next();
  }
}