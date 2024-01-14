import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// emits event with untyped payload
@Injectable({ providedIn: 'root' })
export class SubmitService {
  public submit$ = new Subject();

  public emit(payload: any) {
    this.submit$.next(payload);
  }
}