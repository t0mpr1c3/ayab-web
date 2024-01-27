import { Data, Params } from '@angular/router';
import { RouterReducerState } from '@ngrx/router-store';

export default interface MergedRoute {
  url: string;
  queryParams: Params;
  params: Params;
  data: Data;
}

export type State = RouterReducerState<MergedRoute>;