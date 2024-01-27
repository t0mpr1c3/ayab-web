import { 
  ChangeDetectionStrategy, 
  Component, 
  ElementRef, 
  EventEmitter, 
  HostBinding, 
  Input, 
  Output, 
  ViewChild, 
  booleanAttribute, 
  forwardRef, 
  numberAttribute
} from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

import { TSetting } from '../../../../../../../shared/src/models/settings.model';
import { ColorEnum } from '../../../../../../../shared/src/models/color-enum.model';

/** 
 * @title Needle input commponent
 **/
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'needle-input',
  templateUrl: 'needle-input.component.html',
  styleUrls: ['needle-input.component.css'],
  providers: [
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

  @Output() changeNeedle = new EventEmitter<Event>();
  @Output() changeColor = new EventEmitter<ColorEnum>();

  @ViewChild('needleNumber', { read: ElementRef }) needleNumber!: ElementRef;
  @ViewChild('needleColor', { read: ElementRef }) needleColor!: ElementRef;

  public needle: number;
  public color: number;

  @HostBinding('style.opacity') get opacity() {
    return this.disabled ? '.38' : '.87';
  }

  public get value(): number {
    return this.colorControl.value === 0 ?
      this.width / 2 - (this.needleControl.value as number) : 
      this.width / 2 + (this.needleControl.value as number) - 1;
  }
}