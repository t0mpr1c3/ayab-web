import { MachineConfig, ParameterizedObject, ProvidedActor } from "xstate";

import { UserData, defaultUserData } from "../../models/UserData";
import { AuthEvent, LoginSubmit } from "./auth-machine.events";

export interface AuthContext {
  userData: UserData;
  errors: string;
}

export const defaultContext: AuthContext = {
  userData: defaultUserData,
  errors: ''
};

export const authMachineConfig: MachineConfig<
  AuthContext,
  AuthEvent,
  ProvidedActor,
  ParameterizedObject,
  ParameterizedObject,
  string,
  string
> = {
  id: 'login',
  context: defaultContext,
  initial: 'boot',
  states: {
    boot: {
      on: {
        INIT: [
          { target: 'loggedOut', guard: 'isLoggedOut' },
          { target: 'loggedIn' }
        ]
      }
    },
    loggedOut: {
      on: {
        SUBMIT: 'loading'
      }
    },
    loggedIn: {
      on: {
        LOGOUT: {
          target: 'loggedOut',
          actions: 'releaseUser',
        }
      }
    },
    requestErr: {
      after: {
        // short delay to debounce submit
        500: { target: 'loggedOut' },
      }
    },
    loading: {
      invoke: {
        id: 'loginActor',
        src: 'requestLogin',
        input: ({ event }) => (event as LoginSubmit),
        onError: {
          target: 'requestErr',
          actions: 'assignErrors',
        }
      },
      on: {
        SUCCESS: {
          target: 'loggedIn',
          actions: 'assignUser',
        },
      }
    }
  }
}
