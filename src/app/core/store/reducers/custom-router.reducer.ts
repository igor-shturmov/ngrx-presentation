import { Data, Params, RouterStateSnapshot } from '@angular/router';
import { RouterReducerState, RouterStateSerializer } from '@ngrx/router-store';

// State
export interface ICustomRouterUrlState {
  url: string;
  data: Data;
  params: Params;
  queryParams: Params;
}

// Handlers
export class CustomRouterUrlSerializer implements RouterStateSerializer<ICustomRouterUrlState> {
  serialize(routerState: RouterStateSnapshot): ICustomRouterUrlState {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const { url, root: { queryParams, data } } = routerState;
    const { params } = route;

    return { url, params, queryParams, data };
  }
}

// Selectors
export const routerUrlState = (state: RouterReducerState<ICustomRouterUrlState>): ICustomRouterUrlState => state ? state.state : null;
export const routerUrl = (state: ICustomRouterUrlState) => state ? state.url : '';
export const routerData = (state: ICustomRouterUrlState) => state ? state.data : {};
export const routerParams = (state: ICustomRouterUrlState) => state ? state.params : {};
export const routerQueryParams = (state: ICustomRouterUrlState) => state ? state.queryParams : {};
