import { createReducer, on, Action } from '@ngrx/store';

// Actions
import * as actions from '../actions/router-history.action';

// Interfaces
import { INavigateBackActionPayload } from '../../interfaces/router-history';

// Constants
import { DEFAULT_BACK_ACTION_PAYLOAD, ROUTER_HISTORY_LENGTH } from '../../constants/router-history';

// State
export interface IRouterHistoryState {
  history: string[];
  skipNext: boolean;
  pending: boolean;
}

const initialState: IRouterHistoryState = {
  history: [],
  skipNext: false,
  pending: false,
};

// Handlers
const routerRequestHandler = (state: IRouterHistoryState): IRouterHistoryState => ({
  ...state,
  pending: true,
});

const routerNavigationHandler = (state: IRouterHistoryState, { payload: { routerState: { url } } }): IRouterHistoryState => {
  const shouldSkip: boolean = state.skipNext || (url === (state.history && state.history[state.history.length - 1]));
  const history = shouldSkip ? [...state.history] : [...state.history, url];
  if (history.length > ROUTER_HISTORY_LENGTH) {
    history.shift();
  }

  return {
    ...state,
    history,
    skipNext: false,
  };
};

const routerCancelHandler = (state: IRouterHistoryState): IRouterHistoryState => ({
  ...state,
  pending: false,
});

const routerErrorHandler = (state: IRouterHistoryState): IRouterHistoryState => ({
  ...state,
  pending: false,
});

const routerNavigatedHandler = (state: IRouterHistoryState): IRouterHistoryState => ({
  ...state,
  pending: false,
});

const navigateHandler = (state: IRouterHistoryState, { payload }): IRouterHistoryState => ({
  ...state,
  skipNext: !!payload.doNotSave,
});

const navigateBackHandler = (state: IRouterHistoryState, { payload }): IRouterHistoryState => {
  const updatedPayload: INavigateBackActionPayload = { ...DEFAULT_BACK_ACTION_PAYLOAD, ...payload };
  return {
    ...state,
    skipNext: updatedPayload.removeFromHistory,
  };
};

const navigateBackSuccessHandler = (state: IRouterHistoryState, { payload }): IRouterHistoryState => {
  const newState: IRouterHistoryState = { ...state };
  if (payload.removeFromHistory) {
    newState.history = newState.history.filter((item, index) => index !== (newState.history && newState.history.length - 1));
  }

  return newState;
};

// Reducer
const reducer = createReducer(
  initialState,

  on(actions.routerRequestAction, routerRequestHandler),
  on(actions.routerNavigationAction, routerNavigationHandler),
  on(actions.routerCancelAction, routerCancelHandler),
  on(actions.routerErrorAction, routerErrorHandler),
  on(actions.routerNavigatedAction, routerNavigatedHandler),

  on(actions.navigateAction, navigateHandler),
  on(actions.navigateBackAction, navigateBackHandler),
  on(actions.navigateBackSuccessAction, navigateBackSuccessHandler),
);

export function routerHistoryStateReducer(state: IRouterHistoryState, action: Action): IRouterHistoryState {
  return reducer(state, action);
}

// Selectors
export const routerHistory = (state: IRouterHistoryState) => state && state.history;
export const previousUrl = (history: string[]) => history && history[history.length - 2] || '/';
export const routerPending = (state: IRouterHistoryState) => state && state.pending;
