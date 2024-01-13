import { MachineConfig, ParameterizedObject, ProvidedActor } from "xstate";

import { AuthEvent, LoginSubmit } from "./auth-machine.events";
import { User, defaultUserData } from "../../../../../../shared/src/models/user.model";

export interface AuthContext {
  user: User;
  errors: string;
}

export const defaultAuthContext: AuthContext = {
  user: defaultUserData,
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
  context: defaultAuthContext,
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
