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
 * The compose function is one of our most handy tools. In basic terms, you give
 * it any number of functions and it returns a function. This new function
 * takes a value and chains it through every composed function, returning
 * the output.
 *
 * More: https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch5.html
 */
//import { compose } from '@ngrx/core/compose';

/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import { storeFreeze } from 'ngrx-store-freeze';

/**
 * combineReducers is another useful metareducer that takes a map of reducer
 * functions and creates a new reducer that gathers the values
 * of each reducer and stores them using the reducer's key. Think of it
 * almost like a database, where every reducer is a table in the db.
 *
 * More: https://egghead.io/lessons/javascript-redux-implementing-combinereducers-from-scratch
 */
import { combineReducers } from '@ngrx/store';

/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */
import * as fromLayout from '../core/reducers/layout.reducer';
import * as fromTest from '../core/reducers/test.reducer';
import * as fromKnit from '../core/reducers/knit.reducer';
import * as fromAuth from '../auth/reducers/auth.reducer';
import * as fromUser from '../auth/reducers/user.reducer';
import * as fromLogin from '../auth/reducers/login.reducer';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
  [fromLayout.featureKey]: fromLayout.State;
  [fromTest.featureKey]: fromTest.State;
  [fromKnit.featureKey]: fromKnit.State;
  [fromAuth.featureKey]: fromAuth.State;
  //router: RouterReducerState<any>;
}

/**
 * Because metareducers take a reducer function and return a new reducer,
 * we can use our compose helper to chain them together. Here we are
 * using combineReducers to make our top level reducer, and then
 * wrapping that in storeLogger. Remember that compose applies
 * the result from right to left.
 */
const reducers = {
  [fromLayout.featureKey]: fromLayout.reducer,
  [fromTest.featureKey]: fromTest.reducer,
  [fromKnit.featureKey]: fromKnit.reducer,
  [fromAuth.featureKey]: fromAuth.reducer,
  //router: fromRouter.routerReducer,
};

//const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const developmentReducer: ActionReducer<State> = combineReducers(reducers);
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
export const ROOT_REDUCERS = new InjectionToken<
  ActionReducerMap<State, Action>
>('Root reducers token', {
  factory: () => ({
    [fromLayout.featureKey]: fromLayout.reducer,
    [fromTest.featureKey]: fromTest.reducer,
    [fromKnit.featureKey]: fromKnit.reducer,
    [fromAuth.featureKey]: fromAuth.reducer,
    //router: routerReducer,
  }),
});

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
 * A selector function is a map function factory. We pass it parameters and it
 * returns a function that maps from the larger state tree into a smaller
 * piece of state. This selector simply selects the `books` state.
 *
 * Selectors are used with the `select` operator.
 *
 * ```ts
 * class MyComponent {
 * 	constructor(state$: Observable<State>) {
 * 	  this.booksState$ = state$.select(getBooksState);
 * 	}
 * }
 * ```
 */
// export const getBooksState = (state: State) => state.books;

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them useable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function from the reselect library creates
 * very efficient selectors that are memoized and only recompute when arguments change.
 * The created selectors can also be composed together to select different
 * pieces of state.
 */
// export const getBookEntities = createSelector(getBooksState, fromBooks.getEntities);
// export const getBookIds = createSelector(getBooksState, fromBooks.getIds);
// export const getSelectedBookId = createSelector(getBooksState, fromBooks.getSelectedId);
// export const getSelectedBook = createSelector(getBooksState, fromBooks.getSelected);


/**
 * Just like with the books selectors, we also have to compose the search
 * reducer's and collection reducer's selectors.
 */
// export const getSearchState = (state: State) => state.search;
// export const getSearchBookIds = createSelector(getSearchState, fromSearch.getIds);
// export const getSearchQuery = createSelector(getSearchState, fromSearch.getQuery);
// export const getSearchLoading = createSelector(getSearchState, fromSearch.getLoading);


/**
 * Some selector functions create joins across parts of state. This selector
 * composes the search result IDs to return an array of books in the store.
 */
// export const getSearchResults = createSelector(getBookEntities, getSearchBookIds, (books, searchIds) => {
//   return searchIds.map(id => books[id]);
// });

/**
 * Layout Selectors
 */
export const selectLayoutState = createFeatureSelector<fromLayout.State>(
  fromLayout.featureKey
);

export const selectShowOptions = createSelector(
  selectLayoutState,
  fromLayout.selectShowOptions,
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
 * Knitting Selectors
 */
export const selectKnitState = createFeatureSelector<fromKnit.State>(
  fromKnit.featureKey
);

export const selectImageLoaded = createSelector(
  selectKnitState,
  fromKnit.selectImageLoaded
);

export const selectKnitting = createSelector(
  selectKnitState,
  fromKnit.selectKnitting
);

/**
 * Options enabled selector
 */
export const selectEnableOptions = createSelector(
  selectKnitState,
  selectTestState,
  (knit, test) => ( knit.imageLoaded && !knit.knitting && !test.testing )
);

/**
 * Router Selectors
 */
//export const { selectRouteData } = getRouterSelectors();

/**
 * Authentication Selectors
 */
export const selectAuthState = createFeatureSelector<fromAuth.State>(
  fromAuth.featureKey
);

export const selectUserState = createSelector(
  selectAuthState,
  state => state[fromUser.featureKey]
);

export const selectUser = createSelector(
  selectUserState,
  fromUser.getUser
);

export const selectLoggedIn = createSelector(
  selectUser, 
  (user) => (user !== null)
);

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