import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SubmitSignal } from '../models/submit-signal';

// emits event signal with typed action and untyped payload
@Injectable({ providedIn: 'root' })
export class SubmitService {
  public submit = new Subject<SubmitSignal>();

  public emit(signal: SubmitSignal) {
    this.submit.next(signal);
  }
}