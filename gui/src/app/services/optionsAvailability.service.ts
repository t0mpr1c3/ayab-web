import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// Service governs whether options panel is enabled or disabled
@Injectable({ providedIn: 'root' })
export class OptionsAvailabilityService {
  private _availability = new BehaviorSubject<boolean>(false);

  public available(): Observable<boolean> {
    return this._availability.asObservable();
  }

  public enable() {
    this._availability.next(true);
  }
/*
  public disable() {
    this._availability.next(false);
  }
*/
}