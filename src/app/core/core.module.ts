import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { coreModuleReducers } from './store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { CustomRouterUrlSerializer } from './store/reducers/custom-router.reducer';
import { CoreEffects } from './store/effects';
import { CorePageComponent } from './pages/core-page/core-page.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [CorePageComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    StoreModule.forRoot(coreModuleReducers, {
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
        strictStateSerializability: false,
        strictActionSerializability: false,
      },
    }),
    StoreDevtoolsModule.instrument({
      maxAge: environment.MAX_STORE_AGE,
      logOnly: environment.name !== 'PROD',
    }),
    StoreRouterConnectingModule.forRoot({
      routerState: RouterState.Minimal,
      serializer: CustomRouterUrlSerializer,
    }),
    environment.production ? [] : StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      name: 'NGRX Presentation App',
    }),
    EffectsModule.forRoot(CoreEffects),
    BrowserAnimationsModule,
    HttpClientModule
  ],
  exports: [CoreRoutingModule]
})
export class CoreModule { }
