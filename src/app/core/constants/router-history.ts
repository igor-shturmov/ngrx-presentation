import { INavigateBackActionPayload } from '../interfaces/router-history';

export const ROUTER_HISTORY_LENGTH = 10;

export const DEFAULT_BACK_ACTION_PAYLOAD: INavigateBackActionPayload = {
  removeFromHistory: true,
};
