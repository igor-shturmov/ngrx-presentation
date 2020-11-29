import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector } from '@ngrx/store';

import { CoreModuleState } from '../reducers';
import { ICustomRouterUrlState } from '../reducers/custom-router.reducer';
import { IRouterHistoryState } from '../reducers/router-history.reducer';

export const selectRouterState = createFeatureSelector<CoreModuleState, RouterReducerState<ICustomRouterUrlState>>('routerState');
export const selectRouterHistoryState = createFeatureSelector<CoreModuleState, IRouterHistoryState>('routerHistoryState');
