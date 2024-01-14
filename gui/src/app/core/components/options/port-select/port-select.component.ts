import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

/** 
 * @title Port selection
 **/
@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'port-select',
  templateUrl: 'port-select.component.html',
  styleUrls: ['port-select.component.css'],
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule, 
    MatButtonModule, 
    MatIconModule,
  ],
})
export class PortSelectComponent {
  @Input() disabled: boolean = false;

  public port = "simulation";
}