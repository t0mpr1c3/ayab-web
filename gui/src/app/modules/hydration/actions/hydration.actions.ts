import { createAction, props } from '@ngrx/store';
import * as fromRoot from '../../../reducers';
 
export const hydrateAction = createAction("[Hydration] Hydrate");
 
export const hydrationSuccessAction = createAction(
  "[Hydration] Hydration success",
  props<{ state: fromRoot.State }>()
);
 
export const hydrationFailureAction = createAction("[Hydration] Hydration failure");