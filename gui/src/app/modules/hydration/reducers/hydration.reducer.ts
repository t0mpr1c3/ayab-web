import { Action, ActionReducer, INIT, UPDATE } from '@ngrx/store';
import * as fromRoot from '../../../reducers';
import * as fromHydrate from '../actions/hydration.actions';

function isHydrateSuccess(
  action: Action
): action is ReturnType<typeof fromHydrate.hydrationSuccessAction> {
  return action.type === fromHydrate.hydrationSuccessAction.type;
}
 
// Meta-reducer to re-hydrate state from local storage
// https://nils-mehlhorn.de/posts/ngrx-keep-state-refresh/
export const hydrationMetaReducer = (reducer: ActionReducer<fromRoot.State>): 
  ActionReducer<fromRoot.State> => {
    return (state, action) => {
      if (isHydrateSuccess(action)) {
        return action.state;
      } else {
        return reducer(state, action);
      }
    };
};