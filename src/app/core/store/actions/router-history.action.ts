import { Params } from '@angular/router';
import {
  RouterCancelPayload,
  RouterErrorPayload,
  RouterNavigatedPayload,
  RouterNavigationPayload,
  RouterRequestPayload,
  ROUTER_CANCEL,
  ROUTER_ERROR,
  ROUTER_NAVIGATED,
  ROUTER_NAVIGATION,
  ROUTER_REQUEST,
} from '@ngrx/router-store';
import { createAction } from '@ngrx/store';
import { createPayload } from '../../utils/create-payload';

import { IRouterHistoryState } from '../reducers/router-history.reducer';

import {
  INavigateActionPayload,
  INavigateBackActionPayload,
  INavigateBackSuccessActionPayload,
} from '../../interfaces/router-history';

import { DEFAULT_BACK_ACTION_PAYLOAD } from '../../constants/router-history';
import { TypedAction } from '@ngrx/store/src/models';

export enum ACTION_TYPES {
  NAVIGATE = '[CORE/ROUTER HISTORY] Navigate',

  NAVIGATE_BY_URL = '[CORE/ROUTER HISTORY] Navigate by url',

  NAVIGATE_BACK = '[CORE/ROUTER HISTORY] Navigate back',
  NAVIGATE_BACK_SUCCESS = '[CORE/ROUTER HISTORY] Navigate back wuccess',

  NAVIGATE_TO_MAIN_PAGE = '[CORE/ROUTER HISTORY] Navigate to main page',
}

// Router actions
export const routerRequestAction = createAction(ROUTER_REQUEST, createPayload<RouterRequestPayload>());
export const routerNavigationAction = createAction(ROUTER_NAVIGATION, createPayload<RouterNavigationPayload>());
export const routerNavigatedAction = createAction(ROUTER_NAVIGATED, createPayload<RouterNavigatedPayload>());
export const routerCancelAction = createAction(ROUTER_CANCEL, createPayload<RouterCancelPayload<IRouterHistoryState>>());
export const routerErrorAction = createAction(ROUTER_ERROR, createPayload<RouterErrorPayload<IRouterHistoryState>>());

// Custom actions
export const navigateAction = createAction(ACTION_TYPES.NAVIGATE, createPayload<INavigateActionPayload>());
export const navigateByUrlAction = createAction(ACTION_TYPES.NAVIGATE_BY_URL, createPayload<string>());
export const navigateToMainPageAction = createAction(ACTION_TYPES.NAVIGATE_TO_MAIN_PAGE);
export const navigateBackAction = createAction(
  ACTION_TYPES.NAVIGATE_BACK,
  createPayload<INavigateBackActionPayload>(DEFAULT_BACK_ACTION_PAYLOAD),
);
export const navigateBackSuccessAction = createAction(
  ACTION_TYPES.NAVIGATE_BACK_SUCCESS,
  createPayload<INavigateBackSuccessActionPayload>(),
);

export function go(
  url: Array<string | number> | string,
  queryParams?: Params,
  extras?: any
): TypedAction<ACTION_TYPES.NAVIGATE_BY_URL> | TypedAction<ACTION_TYPES.NAVIGATE> {
  if (typeof url === 'string') {
    return navigateByUrlAction(url);
  }

  return navigateAction({ url, queryParams, extras });
}
