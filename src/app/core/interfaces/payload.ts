import { Action } from '@ngrx/store';

export interface Payload<T> {
  payload: T;
}

export interface ActionWithPayload<T> extends Action {
  readonly payload: T;
}
