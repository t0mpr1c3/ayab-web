import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// sends message when firmware upload menu option is selected
@Injectable({ providedIn: 'root' })
export class StartFirmwareService {
  public startFirmware = new Subject<void>();

  public emit() {
    this.startFirmware.next();
  }
}