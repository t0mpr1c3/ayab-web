import { Component } from '@angular/core';
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
  selector: 'port-select',
  templateUrl: 'port-select.html',
  styleUrls: ['port-select.css'],
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule, 
    MatButtonModule, 
    MatIconModule,
  ],
})
export class PortSelect {
  public port = "simulation";
}