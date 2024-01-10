import { Injectable, OnDestroy, OnInit } from "@angular/core";
import { 
  Actor,
  AnyActorRef,
  ParameterizedObject,
  ProvidedActor,
  ResolveTypegenMeta,
  StateMachine,
  StateValue,
  TypegenDisabled,
  createActor,
  createMachine
} from "xstate";
import { Observable, Subscription } from "rxjs";

import { OptionsVisibilityService } from "../optionsVisibility.service";
import { OptionsAvailabilityService } from "../optionsAvailability.service";
import { GuiContext, guiMachineConfig } from "./gui-machine.config";
import { GuiEvent } from "./gui-machine.events";

@Injectable({ providedIn: 'root' })
export class GuiMachineService implements OnInit, OnDestroy {
  private _guiMachine = createMachine(guiMachineConfig)
    .provide({
      actions: {
        showOptions : () => {
          this._availabilityService.enable();
          this._visibilityService.show();
        }
      }
    });

  public service: Actor<
    StateMachine<
      GuiContext,
      GuiEvent,
      Record<string, AnyActorRef>,
      ProvidedActor,
      ParameterizedObject,
      ParameterizedObject,
      string,
      StateValue,
      string,
      unknown,
      unknown,
      ResolveTypegenMeta<
        TypegenDisabled,
        GuiEvent,
        ProvidedActor,
        ParameterizedObject,
        ParameterizedObject,
        string,
        string
      >
    >
  >;  
  
  public visible$: Observable<boolean>;
  private _visibilitySubscription: Subscription;
  
  constructor(
    private _visibilityService: OptionsVisibilityService,
    private _availabilityService: OptionsAvailabilityService,
  ) {
    this.service = createActor(this._guiMachine, { devTools: true }).start();
  }

  ngOnInit(): void {
    this.visible$ = this._visibilityService.visible();
    this._visibilitySubscription = this.visible$.subscribe();
  }

  ngOnDestroy(): void {
    this._visibilitySubscription.unsubscribe();
  }

  public send(event: GuiEvent): void {
    this.service.send(event);
  }
}