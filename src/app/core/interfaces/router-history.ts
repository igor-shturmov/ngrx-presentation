import { Params } from '@angular/router';

export interface INavigateActionPayload {
  url: Array<string | number | boolean>;
  queryParams?: Params;
  doNotSave?: boolean;
  extras?: any;
}

export interface INavigateBackActionPayload {
  removeFromHistory?: boolean;
  externalURL?: Array<string | number | boolean>;
}

export interface INavigateBackSuccessActionPayload {
  removeFromHistory: boolean;
}

export type INavigateLink = Array<string | number>;
