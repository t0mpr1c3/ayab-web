import { CommonModule } from "@angular/common";
import { 
  AfterViewChecked, 
  ChangeDetectionStrategy, 
  Component, 
  ElementRef, 
  Input, 
  ViewChild, 
  booleanAttribute 
} from "@angular/core";

/**
 * @title Mirror icon
 */
@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mirror-icon',
  template: `<img #img class="mirror-icon" src="">`,
  styles: [`
    .mirror-icon {
      width: 18px;
      height: 18px;
      position: relative;
      top: -1rem;
    }
  `],
  imports: [CommonModule],
})
export class MirrorIconComponent implements AfterViewChecked {
  @Input({ required: true, transform: booleanAttribute }) knitSide: boolean;
  @Input({ transform: booleanAttribute }) disabled: boolean = true;
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