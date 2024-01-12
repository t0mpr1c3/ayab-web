import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild, booleanAttribute } from "@angular/core";

/**
 * @title Mirror icon
 */
@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mirror-icon',
  templateUrl: 'mirror-icon.component.html',
  styleUrls: ['mirror-icon.component.css'],
  imports: [CommonModule],
})
export class MirrorIcon {
  @Input({ required: true, transform: booleanAttribute }) knitSide: boolean;
  @ViewChild('img', { read: ElementRef }) private _img: ElementRef;

  public isDisabled(disabled: boolean): void {
    this._img.nativeElement.style.opacity = disabled ? '0.38' : '0.87';
  }
}