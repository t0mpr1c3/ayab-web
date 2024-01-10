import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

/**
 * @title Mirror icon
 */
@Component({
  standalone: true,
  selector: 'mirror-icon',
  templateUrl: 'mirror-icon.html',
  styleUrls: ['mirror-icon.css'],
  imports: [CommonModule],
})
export class MirrorIcon {
  @Input({ required: true }) disabled: boolean;
  @Input({ required: true }) knitSide: boolean;

  public knitSideImageSetting: boolean;
}