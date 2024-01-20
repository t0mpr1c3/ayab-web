import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/** 
 * @title Port selection component
 **/
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'port-select',
  templateUrl: 'port-select.component.html',
  styleUrls: ['port-select.component.css'],
})
export class PortSelectComponent {
  @Input() disabled: boolean = false;

  public port = "simulation";
}