import { createSelector } from '@ngrx/store';

import * as selectors from '../reducers/router-history.reducer';

// Selectors
import { selectRouterHistoryState } from './index';

export const getRouterHistory = createSelector(selectRouterHistoryState, selectors.routerHistory);
export const getRouterPending = createSelector(selectRouterHistoryState, selectors.routerPending);
export const getPreviousUrl = createSelector(getRouterHistory, selectors.previousUrl);
