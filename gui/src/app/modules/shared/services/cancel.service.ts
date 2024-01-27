import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// Sends message when cancel button is pressed
@Injectable({ providedIn: 'root' })
export default class CancelService {
  public cancel = new Subject<void>();

  public emit() {
    this.cancel.next();
  }
}