import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import {
  createActor,
  createMachine,
  assign,
  fromObservable,
  ProvidedActor,
  ParameterizedObject,
  StateMachine,
  Actor,
  ResolveTypegenMeta,
  AnyActorRef,
  StateValue,
  TypegenDisabled,
} from 'xstate';

import { AuthService } from '../auth.service';
import { AuthContext, authMachineConfig } from './auth-machine.config';
import { AuthEvent, Init, LoginSubmit, LoginSuccess, LoginFail } from './auth-machine.events';
import { UserData, defaultUserData } from '../../models/user-data.model';
import { LoginCredentials } from '../../models/credentials.model';
import { LoginResponse } from '../../models/login-response.model';
import { isLoggedOut, removeUserData, setToken, setUserData } from '../../helpers/auth';
import { formatStatus } from '../../helpers/status';

@Injectable({ providedIn: 'root' })
export class AuthMachineService {
  private _authMachine = createMachine(authMachineConfig).provide({
    actors: {
      requestLogin:
        fromObservable<LoginSuccess|LoginFail, LoginSubmit>(
          ({ input }) => 
            this._authService
              .login$(new LoginCredentials(input.username, input.password))
              .pipe(
                map<LoginResponse, LoginSuccess>(res => {
                  let output = new LoginSuccess(res.user, res.access_token);
                  this.service.send(output); // ??? don't know why parent is not subscribed
                  return output;
                })
              )
        )
    },
    actions: {
      assignUser: 
        assign({
          userData: ({ event }) => {   
            let _event = event as LoginSuccess;
            setToken(_event.token);
            setUserData(_event.userData);
            this._user.next(<UserData>_event.userData);
            return _event.userData;
          }
        }),
      assignErrors: 
        assign({
          errors: ({ event }) => {   
            let _event = event as LoginFail;
            let result = formatStatus(_event.error.error);
            console.log(result);
            return result;
          }
        }),
      releaseUser: 
        assign({
          userData: () => {
            removeUserData();
            this._user.next(null);
            return defaultUserData;
          }
        }),
    },
    guards: {
      isLoggedOut: () => isLoggedOut(),
    },
  });

  // you could say this is strongly typed
  public service: Actor<
    StateMachine<
      AuthContext,
      AuthEvent,
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
        AuthEvent,
        ProvidedActor,
        ParameterizedObject,
        ParameterizedObject,
        string,
        string
      >
    >
  >;

  public send(event: AuthEvent): void {
    this.service.send(event);
  }

  private _user: BehaviorSubject<UserData|null>;
  public user$: Observable<UserData|null>;
  public loggedIn$: Observable<boolean>;
  
  constructor(
    private _authService: AuthService,
  ) {
    this.service = createActor(this._authMachine).start();
    this.service.send(new Init(isLoggedOut()));
    this._user = new BehaviorSubject<UserData|null>(
      JSON.parse(localStorage.getItem('userData')!)
    );
  }

  public user(): Observable<UserData|null> {
    return this._user.asObservable();
  }

  public loggedIn(): Observable<boolean> {
    return this.user().pipe( map<UserData|null, boolean>(user => !!user));
  }
}