import { MachineConfig, ParameterizedObject, ProvidedActor } from "xstate";

import { GuiEvent } from "./gui-machine.events";

export interface GuiContext {
  errors: string;
}

export const defaultGuiContext: GuiContext = {
  errors: ''
};

export const guiMachineConfig: MachineConfig<
  GuiContext,
  GuiEvent,
  ProvidedActor,
  ParameterizedObject,
  ParameterizedObject,
  string,
  string
> = {
  id: 'gui',
  context: defaultGuiContext,
  initial: 'noImage',
  states: {
    noImage: {
      on: {
        START_TEST: 'testingNoImage',
        LOAD_IMAGE: {
          target: 'configuring',
          actions: 'showOptions',
        }
      }
    },
    testingNoImage: {
      on: {
        STOP_TEST: 'noImage',
      }
    },
    configuring: {
      on: {
        START_KNIT: 'checking',
        START_TEST: 'testing',
      }
    },
    checking: {
      on: {
        LOAD_IMAGE: 'configuring',
        FAIL_CHECK: 'configuring',
        PASS_CHECK: 'knitting',
      }
    },
    knitting: {
      on: {
        STOP_KNIT: 'configuring',
      }
    },
    testing: {
      on: {
        STOP_TEST: 'configuring',
      }
    },
  }
}