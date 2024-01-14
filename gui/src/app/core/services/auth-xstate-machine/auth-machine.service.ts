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

import { AuthApiService } from '../auth-api.service';
import { AuthContext, authMachineConfig } from './auth-machine.config';
import { AuthEvent, Init, LoginSubmit, LoginSuccess, LoginFail } from './auth-machine.events';
import { User, defaultUserData } from '../../../../../../shared/src/models/user.model';
import { LoginCredentials } from '../../../../../../shared/src/models/credentials.model';
import { LoginResponse } from '../../models/login-response.model';
import { getUser, isLoggedOut, removeUser, setToken, setUser } from '../auth/helpers/auth';
import { formatStatus } from '../../helpers/status';

@Injectable({ providedIn: 'root' })
export class AuthMachineService {
  private _authMachine = createMachine(authMachineConfig).provide({
    actors: {
      requestLogin:
        fromObservable<LoginSuccess|LoginFail, LoginSubmit>(
          ({ input }) => 
            this._authApiService
              .login$({ username: input.username, password: input.password })
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
          user: ({ event }) => {   
            let _event = event as LoginSuccess;
            setToken(_event.token);
            setUser(_event.userData);
            this._user.next(<User>_event.userData);
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
          user: () => {
            removeUser();
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

  private _user: BehaviorSubject<User|null>;
  public user$: Observable<User|null>;
  public loggedIn$: Observable<boolean>;
  
  constructor(
    private _authApiService: AuthApiService,
  ) {
    this.service = createActor(this._authMachine).start();
    this.service.send(new Init(isLoggedOut()));
    this._user = new BehaviorSubject<User|null>(getUser());
  }

  public user(): Observable<User|null> {
    return this._user.asObservable();
  }

  public loggedIn(): Observable<boolean> {
    return this.user().pipe( map<User|null, boolean>(user => !!user));
  }
}