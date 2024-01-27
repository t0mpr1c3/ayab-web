import { 
  ChangeDetectionStrategy, 
  Component, 
  ElementRef, 
  HostBinding, 
  Input, 
  ViewChild, 
  booleanAttribute, 
  forwardRef, 
  numberAttribute
} from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { map } from 'rxjs';

import OptionsFacade from '../../facade/options.facade';
import { TSetting } from '../../../../../../../shared/src/models/settings.model';
import { MachineEnum } from '../../../../../../../shared/src/models/machine-enum.model';

/** 
 * @title Needle input commponent
 **/
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'needle-input',
  templateUrl: 'needle-input.component.html',
  styleUrls: ['needle-input.component.css'],
  providers: [
    OptionsFacade,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NeedleInputComponent),
      multi: true
    }
  ]
})
export default class NeedleInputComponent {
  @Input({ required: true }) colorControl: FormControl<TSetting>;
  @Input({ required: true }) needleControl: FormControl<TSetting>;
  @Input({ required: true }) title: string;
  @Input({ transform: booleanAttribute }) disabled: boolean = false;
  @Input({ transform: numberAttribute }) width: number = 200;

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
constructor(private _facade: OptionsFacade) {}
}