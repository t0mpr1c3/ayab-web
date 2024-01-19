import { CommonModule } from "@angular/common";
import { 
  AfterViewChecked, 
  ChangeDetectionStrategy, 
  Component,
  Input,
  ViewChild, 
  booleanAttribute 
} from "@angular/core";

import { MirrorIconDirective } from "./mirror-icon.directive";

/**
 * @title Mirror icon
 */
@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mirror-icon',
  template: `
    <img id="mirrorIcon" class="mirror-icon" [disabled]="disabled" [knitSide]="knitSide">
  `,
  styles: [`
    .mirror-icon {
      width: 18px;
      height: 18px;
      position: relative;
      top: -1rem;
      left: -10px;
    }
  `],
  imports: [
    CommonModule, 
    MirrorIconDirective,
  ],
})
export class MirrorIconComponent implements AfterViewChecked {
  @Input({ transform: booleanAttribute }) disabled: boolean = true;
  @Input({ transform: booleanAttribute }) knitSide: boolean = false;

  @ViewChild(MirrorIconDirective) icon: MirrorIconDirective;

  constructor() {}
  
  ngAfterViewChecked(): void {
    this.mirror(this.knitSide);
    this.disable(this.disabled);
  }
  
  public disable(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.icon.disabled = isDisabled;
  }

  public mirror(isKnitSide: boolean): void {
    this.knitSide = isKnitSide;
    this.icon.knitSide = isKnitSide;
  }
}