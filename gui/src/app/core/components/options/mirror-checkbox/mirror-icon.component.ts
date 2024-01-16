import { CommonModule } from "@angular/common";
import { 
  AfterViewChecked, 
  ChangeDetectionStrategy, 
  Component,
  Input,
  ViewChild, 
  booleanAttribute 
} from "@angular/core";

import { MirrorImgDirective } from "./mirror-img.directive";

/**
 * @title Mirror icon
 */
@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mirror-icon',
  template: `<img #img class="mirror-icon">`,
  styles: [`
    .mirror-icon {
      width: 18px;
      height: 18px;
      position: relative;
      top: -1rem;
    }
  `],
  imports: [
    CommonModule, 
    MirrorImgDirective,
  ],
})
export class MirrorIconComponent implements AfterViewChecked {
  @Input({ required: true, transform: booleanAttribute }) knitSide: boolean;
  @Input({ transform: booleanAttribute }) disabled: boolean = true;
  @ViewChild(MirrorImgDirective) img!: MirrorImgDirective;
  
  ngAfterViewChecked(): void {
    this.mirror(this.knitSide);
    this.disable(this.disabled);
  }

  public mirror(isKnitSide: boolean): void {
    this.knitSide = isKnitSide;
    this.img.knitSide = isKnitSide;
  }
  
  public disable(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.img.disabled = isDisabled;
  }
}