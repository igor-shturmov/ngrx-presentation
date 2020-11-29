import { InjectionToken } from '@angular/core';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { ICustomRouterUrlState } from './custom-router.reducer';
import { IRouterHistoryState, routerHistoryStateReducer } from './router-history.reducer';


export interface CoreModuleState {
  routerState: RouterReducerState<ICustomRouterUrlState>;
  routerHistoryState: IRouterHistoryState;
  [key: string]: any; // For feature stores
}

export const coreModuleReducers = new InjectionToken<ActionReducerMap<CoreModuleState>>(
  'CORE_MODULE_STATE', {
    factory: () => ({
      routerState: routerReducer,
      routerHistoryState: routerHistoryStateReducer,
    }),
  });
