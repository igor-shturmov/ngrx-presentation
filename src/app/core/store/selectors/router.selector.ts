import { createSelector } from '@ngrx/store';

import * as selectors from '../reducers/custom-router.reducer';

// Selectors
import { selectRouterState } from './';

export const getRouterState = createSelector(selectRouterState, selectors.routerUrlState);
export const getRouterUrl = createSelector(getRouterState, selectors.routerUrl);
export const getRouterData = createSelector(getRouterState, selectors.routerData);
export const getRouterParams = createSelector(getRouterState, selectors.routerParams);
export const getRouterQueryParams = createSelector(getRouterState, selectors.routerQueryParams);
