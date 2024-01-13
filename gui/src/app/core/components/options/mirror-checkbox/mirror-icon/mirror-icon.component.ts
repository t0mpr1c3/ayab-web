import { CommonModule } from "@angular/common";
import { AfterViewChecked, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild, booleanAttribute } from "@angular/core";

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
export class MirrorIcon implements AfterViewChecked {
  @Input({ required: true, transform: booleanAttribute }) knitSide: boolean;
  @Input({transform: booleanAttribute }) disabled: boolean = true;
  @ViewChild('img', { read: ElementRef }) private _img: ElementRef;

  ngAfterViewChecked(): void {
    this.disable(this.disabled);
    this.mirror(this.knitSide);
  }

  public mirror(knitSide: boolean): void {
    this.knitSide = knitSide;
    this._img.nativeElement.src = knitSide ?
      "../../../../assets/img/garamond-lowercase-e.png" :
      "../../../../assets/img/garamond-lowercase-e-reversed.png";
  }
  
  public disable(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this._img.nativeElement.style.opacity = isDisabled ?
      '0.38' :
      '0.87';
  }
}