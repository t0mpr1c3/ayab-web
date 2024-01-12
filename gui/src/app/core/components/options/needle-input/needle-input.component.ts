import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild, booleanAttribute, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TSetting } from '../../../models/settings.model';

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
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule,
  ],
  /*
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NeedleInput),  // replace name as appropriate
      multi: true
    }
  ]
  */
})
export class NeedleInput {
  @Input({ required: true }) title: string;
  @Input({ required: true }) color: string;
  @Input({ required: true }) control: FormControl<TSetting>;
  @Input({ transform: booleanAttribute }) disabled: boolean = false;

  @ViewChild('needleNumber') needleNumber!: ElementRef;
  @ViewChild('needleColor') needleColor!: ElementRef;

  public value(): number {
    // selected color determines sign of returned value
    if (this.needleColor.nativeElement.value === 0) {
      return -this.needleNumber.nativeElement.value;
    } else {
      return this.needleNumber.nativeElement.value;
    }    
  }
}