import {
  createSelector,
  createFeatureSelector,
  ActionReducer,
  Action,
  ActionReducerMap,
  MetaReducer,
} from '@ngrx/store';
/*
import {
  getRouterSelectors,
  routerReducer,
  RouterReducerState,
} from '@ngrx/router-store';
*/
import { InjectionToken, isDevMode } from '@angular/core';

import { environment } from '../environments/environment';

/**
 * The compose function is one of our most handy tools. In basic terms, 
 * you give it any number of functions and it returns a function. This new 
 * function takes a value and chains it through every composed function, 
 * returning the output.
 *
 * More: https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch5.html
 */
import { compose } from '@ngrx/store';

/**
 * storeFreeze prevents state from being mutated. When mutation occurs,
 * an exception will be thrown. This is useful during development mode
 * to ensure that none of the reducers accidentally mutates the state.
 */
import { storeFreeze } from 'ngrx-store-freeze';

/**
 * combineReducers is another useful metareducer that takes a map of 
 * reducer functions and creates a new reducer that gathers the values
 * of each reducer and stores them using the reducer's key. Think of it
 * almost like a database, where every reducer is a table in the db.
 *
 * More: https://egghead.io/lessons/javascript-redux-implementing-combinereducers-from-scratch
 */
import { combineReducers } from '@ngrx/store';

/**
 * Every reducer module's default export is the reducer function itself.
 * In addition, each module should export a type or interface that 
 * describes the state of the reducer plus any selector functions. 
 * The `* as` notation packages up all of the exports into a single object.
 */
import * as fromAuth from '../modules/auth/reducers/auth.reducer';
import * as fromProf from '../modules/auth/reducers/profile.reducer';
import * as fromLogin from '../modules/auth/reducers/login.reducer';
import * as fromUser from '../modules/auth/reducers/user.reducer';
import * as fromCore from '../modules/core/reducers/core.reducer';
import * as fromImage from '../modules/image/reducer/image.reducer';
import * as fromLayout from '../modules/core/reducers/layout.reducer';
import * as fromKnit from '../modules/knit/reducers/knit.reducer';
import * as fromTest from '../modules/test-device/reducers/test.reducer';
import * as fromFirmware from '../modules/firmware-upload/reducers/firmware.reducer';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
  [fromAuth.featureKey]: fromAuth.State;
  [fromCore.featureKey]: fromCore.State;
  [fromKnit.featureKey]: fromKnit.State;
  [fromTest.featureKey]: fromTest.State;
  [fromFirmware.featureKey]: fromFirmware.State;
  //router: RouterReducerState<any>;
}

/**
 * Because metareducers take a reducer function and return a new reducer,
 * we can use our compose helper to chain them together. Here we are
 * using combineReducers to make our top level reducer, and then
 * wrapping that in storeLogger. Remember that compose applies the result 
 * from right to left.
 */
const reducers = {
  [fromAuth.featureKey]: fromAuth.reducer,
  [fromCore.featureKey]: fromCore.reducer,
  [fromKnit.featureKey]: fromKnit.reducer,
  [fromTest.featureKey]: fromTest.reducer,
  [fromFirmware.featureKey]: fromFirmware.reducer,
  //router: fromRouter.routerReducer,
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}

/**
 * Our state is composed of a map of action reducer functions.
 * These reducer functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 */
export const rootReducers: ActionReducerMap<State, Action> = {
  [fromAuth.featureKey]: fromAuth.reducer,
  [fromCore.featureKey]: fromCore.reducer,
  [fromKnit.featureKey]: fromKnit.reducer,
  [fromTest.featureKey]: fromTest.reducer,
  [fromFirmware.featureKey]: fromFirmware.reducer,
  //router: routerReducer,
};

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state, action) => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('prev state', state);
    console.log('action', action);
    console.log('next state', result);
    console.groupEnd();
    return result;
  };
}

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<State>[] = isDevMode() ? [logger] : [];

/**
 * A selector function is a map function factory. We pass it parameters and 
 * it returns a function that maps from the larger state tree into a smaller
 * piece of state. Selectors are used with the `select` operator.
 *
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them useable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function from the reselect library creates efficient 
 * selectors that are memoized and only recompute when arguments change.
 * The created selectors can also be composed together to select different
 * pieces of state.
 */

/**
 * Authentication Selectors
 */
export const selectAuthState = createFeatureSelector<fromAuth.State>(
  fromAuth.featureKey
);

export const selectProfileState = createSelector(
  selectAuthState,
  state => state[fromProf.featureKey]
);

export const selectUserState = createSelector(
  selectProfileState,
  state => state[fromUser.featureKey]
);

export const selectUser = createSelector(
  selectUserState,
  fromUser.getUser
);

export const selectSettings = createSelector(
  selectUserState,
  fromUser.getSettings
);

export const selectLoggedIn = createSelector(
  selectUser, 
  (user) => (user !== null)
);

/**
 * Login Selectors
 */
export const selectLoginState = createSelector(
  selectAuthState,
  state => state[fromLogin.featureKey]
);

export const selectLoginError = createSelector(
  selectLoginState,
  fromLogin.getError
);

export const selectLoginPending = createSelector(
  selectLoginState,
  fromLogin.getPending
);

/**
 * Layout Selectors
 */
export const selectCoreState = createFeatureSelector<fromCore.State>(
  fromCore.featureKey
)

export const selectLayoutState = createSelector(
  selectCoreState,
  state => state[fromLayout.featureKey]
);

export const selectOptionsShown = createSelector(
  selectLayoutState,
  fromLayout.selectOptionsShown,
);

/**
 * Image Selectors
 */
export const selectImageState = createSelector(
  selectCoreState,
  state => state[fromImage.featureKey]
);

export const selectImageLoaded = createSelector(
  selectImageState,
  fromImage.selectImageLoaded
);

export const selectImage = createSelector(
  selectImageState,
  fromImage.selectImage
);

export const selectImageScale = createSelector(
  selectImageState,
  fromImage.selectImageScale
);

export const selectImageXScale = createSelector(
  selectImageState,
  fromImage.selectImageXScale
);

export const selectImageYScale = createSelector(
  selectImageState,
  fromImage.selectImageYScale
);

export const selectSceneCreated = createSelector(
  selectImageState,
  fromImage.selectSceneCreated,
);

/**
 * Knitting Selectors
 */
export const selectKnitState = createFeatureSelector<fromKnit.State>(
  fromKnit.featureKey
);

export const selectKnitting = createSelector(
  selectKnitState,
  fromKnit.selectKnitting
);

/**
 * Test Selectors
 */
export const selectTestState = createFeatureSelector<fromTest.State>(
  fromTest.featureKey
);

export const selectTesting = createSelector(
  selectTestState,
  fromTest.selectTesting
);

/**
 * Firmware Selectors
 */
export const selectFirmwareState = createFeatureSelector<fromFirmware.State>(
  fromFirmware.featureKey
);

export const selectFirmware = createSelector(
  selectFirmwareState,
  fromFirmware.selectFirmware
);

/**
 * Menu enabled selector
 */
export const selectMenuEnabled = createSelector(
  selectKnitState,
  selectTestState,
  selectFirmwareState,
  (knitting, test, firmware) => ( 
    !knitting.knitting && 
    !test.testing && 
    !firmware.uploading
  )
);

/**
 * Options panel enabled selector (AKA configuring state)
 */
export const selectConfiguring = createSelector(
  selectImageState,
  selectKnitState,
  selectTestState,
  selectFirmwareState,
  (image, knitting, test, firmware) => ( 
    !!image.data && 
    !knitting.knitting && 
    !test.testing && 
    !firmware.uploading
  )
);

/**
 * Router Selectors
 */
//export const { selectRouteData } = getRouterSelectors();