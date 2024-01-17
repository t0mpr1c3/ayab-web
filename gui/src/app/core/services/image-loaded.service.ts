import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// sends message when cancel button is pressed
@Injectable({ providedIn: 'root' })
export class ImageLoadedService {
  public imageLoaded = new Subject<void>();

  public emit() {
    this.imageLoaded.next();
  }
}