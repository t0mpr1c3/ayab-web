// import required packages
import 'zone.js'
import AppRoutingModule, { routes } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import CoreModule from '../core/core.module';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import NgrxRouterStoreModule from '../router/router.module';
import { RouterModule } from '@angular/router';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { rootReducers, metaReducers } from '../../reducers';
import AuthEffects from '../auth/effects/auth.effects';
import ImageEffects from '../image/effects/image.effects';
import KnitEffects from '../knit/effects/knit.effects';
import HydrationEffects from '../hydration/effects/hydration.effects';
import SettingsEffects from '../settings/effects/settings.effects';
import RegistrationEffects from '../registration/effects/registration.effects';

import ApiService from '../shared/services/api.service';
import AuthApiService from '../auth/services/auth-api.service';
import CancelService from '../shared/services/cancel.service';
import LocalStorageService from '../shared/services/local-storage.service';
import OptionsService from '../options/services/options.service';
import UserApiService from '../settings/services/user-api.service';
import AppComponent from './app.component';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    CoreModule,
    HttpClientModule,
    NgrxRouterStoreModule,
    StoreModule,

    RouterModule.forRoot(routes),

    /**
     * StoreModule.forRoot is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * reducers, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store based 
     * application.
     */
    StoreModule.forRoot(rootReducers, {
      metaReducers,
      runtimeChecks: {
        // strictStateImmutability and strictActionImmutability are enabled by default
        strictStateSerializability: true, // fails for ImageData
        strictActionSerializability: true, // fails for ImageData
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true,
      },
    }),

    /**
     * Enable debugging using Redux Devtools extension for Chrome or Firefox.
     *
     * See: https://github.com/zalmoxisus/redux-devtools-extension
     */
    StoreDevtoolsModule.instrument(),

    /**
     * @ngrx/router-store keeps router state up-to-date in the store and uses
     * the store as the single source of truth for the router's state.
     */
    StoreRouterConnectingModule.forRoot(),

    /**
     * Register effects.
     *
     * See: https://ngrx.io/guide/effects#registering-root-effects
     */
    EffectsModule.forRoot([
      AuthEffects,
      HydrationEffects,
      ImageEffects,
      KnitEffects,
      SettingsEffects,
      RegistrationEffects,
    ]),
  ],
  providers: [
    /**
     * Register services.
     */
    ApiService,
    AuthApiService,
    CancelService,
    LocalStorageService,
    OptionsService,
    UserApiService,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
