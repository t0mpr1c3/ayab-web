import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OptionsVisibilityService {
  private _visibility = new BehaviorSubject<boolean>(false);
  
  public visible(): Observable<boolean> {
    return this._visibility.asObservable();
  }

  public show() {
    this._visibility.next(true);
  }

  public hide() {
    this._visibility.next(false);
  }
}