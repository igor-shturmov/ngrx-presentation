import { Injectable } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { select, Action, Store } from '@ngrx/store';

import { defer, of, throwError, Observable } from 'rxjs';
import { catchError, concatMap, filter, map, tap, withLatestFrom } from 'rxjs/operators';

import * as actions from '../actions/router-history.action';
import { CoreModuleState } from '../reducers';
import { getPreviousUrl } from '../selectors/router-history.selector';
import { getRouterUrl } from '../selectors/router.selector';

import { Payload } from '../../interfaces/payload';
import { INavigateActionPayload, INavigateBackActionPayload } from '../../interfaces/router-history';

@Injectable()
export class RouterHistoryEffect {
  constructor(private readonly router: Router,
              private readonly store: Store<CoreModuleState>,
              private readonly actions$: Actions) {
  }

  navigate$: Observable<any> = createEffect(() => defer(() =>
    this.actions$.pipe(
      ofType(actions.navigateAction),
      tap(({ payload: { url, queryParams, extras } }: Payload<INavigateActionPayload>) =>
        this.router.navigate(url, { queryParams, ...extras }),
      ),
      catchError(error => throwError(error)),
    )), { dispatch: false });

  navigateBack$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.navigateBackAction),
      withLatestFrom(
        this.store.pipe(select(getPreviousUrl)),
        this.store.pipe(select(getRouterUrl)),
      ),
      map(([{ payload }, previousUrl, currentUrl]: [Payload<INavigateBackActionPayload>, string, string]) => {
        const { removeFromHistory, externalURL } = payload;

        if (previousUrl && previousUrl !== '/' && previousUrl !== currentUrl) {
          this.router.navigateByUrl(previousUrl);
        } else {
          this.router.navigate(externalURL);
        }

        return removeFromHistory;
      }),
      concatMap((removeFromHistory: boolean) => of(removeFromHistory).pipe(withLatestFrom(this.router.events))),
      filter(([removeFromHistory, event]: [boolean, RouterEvent]) => event instanceof NavigationEnd),
      map(([removeFromHistory, event]: [boolean, RouterEvent]) => actions.navigateBackSuccessAction({ removeFromHistory })),
      catchError(error => throwError(error)),
    ));

  navigateByUrl$: Observable<any> = createEffect(() => defer(() => this.actions$
    .pipe(
      ofType(actions.navigateByUrlAction),
      tap(({ payload: url }: Payload<string>) => this.router.navigateByUrl(url)),
      catchError(error => throwError(error)),
    )), { dispatch: false });
}
