import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, ViewChild, booleanAttribute, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { TSetting } from '../../../../../../../shared/src/models/settings.model';

/** 
 * @title Needle input
 **/
@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'needle-input',
  templateUrl: 'needle-input.component.html',
  styleUrls: ['needle-input.component.css'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NeedleInputComponent),
      multi: true
    }
  ]
})
export class NeedleInputComponent {
  @Input({ required: true }) colorControl: FormControl<TSetting>;
  @Input({ transform: booleanAttribute }) disabled: boolean = false;
  @Input({ required: true }) needleControl: FormControl<TSetting>;
  @Input({ required: true }) title: string;

  @ViewChild('needleNumber', { read: ElementRef }) needleNumber!: ElementRef;
  @ViewChild('needleColor', { read: ElementRef }) needleColor!: ElementRef;

  public needle: number;
  public color: number;

  @HostBinding('style.opacity') get opacity() {
    return this.disabled ? '.38' : '.87';
  }
/*
  public get value(): number {
    // selected color determines sign of returned value
    if (this.needleColor.nativeElement.value === 0) {
      return -this.needleNumber.nativeElement.value;
    } else {
      return this.needleNumber.nativeElement.value;
    }    
*/
}