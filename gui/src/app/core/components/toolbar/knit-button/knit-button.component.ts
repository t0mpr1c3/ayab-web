import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { Subscription } from 'xstate';

/** 
 * @title Knit button
 **/
@Component({
  standalone: true,
  selector: 'knit-button',
  templateUrl: 'knit-button.component.html',
  styleUrls: ['knit-button.component.css'],
  imports: [MatButtonModule]
})
export class KnitButtonComponent implements OnInit, OnDestroy {
  public enabled: boolean = false;

  constructor() {}

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  public knit(): void {
  }
}