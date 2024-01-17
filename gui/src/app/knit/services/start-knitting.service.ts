import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// sends message when Knit button is pressed
@Injectable({ providedIn: 'root' })
export class StartKnittingService {
  public startKnitting = new Subject<void>();

  public emit() {
    this.startKnitting.next();
  }
}