import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { GuiMachineService } from '../../../services/gui-machine/gui-machine.service';
import { KnitButtonClicked } from '../../../services/gui-machine/gui-machine.events';
import { Subscription } from 'xstate';
import { Observable } from 'rxjs';

/** 
 * @title Knit button
 **/
@Component({
  standalone: true,
  selector: 'knit-button',
  templateUrl: 'knit-button.html',
  styleUrls: ['knit-button.css'],
  imports: [MatButtonModule]
})
export class KnitButton implements OnInit, OnDestroy {
  private _guiMachineSubscription: Subscription;
  public enabled: boolean = false;

  constructor(private _guiMachineService: GuiMachineService) {}

  ngOnInit(): void {
    this._guiMachineSubscription = this._guiMachineService.service.subscribe(event => {
      console.log('GUI state:')
      console.log(event)
      this.enabled = (event.value === 'configuring');
    });
  }

  ngOnDestroy(): void {
    this._guiMachineSubscription.unsubscribe();
  }

  public knit(): void {
    this._guiMachineService.service.send(new KnitButtonClicked());
  }
}