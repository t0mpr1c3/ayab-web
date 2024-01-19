// import required packages
import 'zone.js'
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
//import { provideRouter } from '@angular/router';

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import * as fromAuth from './app/auth/reducers/auth.reducer';
import * as fromLayout from './app/core/reducers/layout.reducer';
import * as fromKnittable from './app/knit/reducers/knittable.reducer';
import * as fromTest from './app/test-device/reducers/test.reducer';
import * as fromFirmware from './app/firmware-upload/reducers/firmware.reducer';
import { AuthEffects } from './app/auth/effects/auth.effects';
import { UserEffects } from './app/profile/effects/user.effects';

//import { routes } from './app/root/router';
import { ApiService } from './app/services/api.service';
import { AuthApiService } from './app/auth/services/auth-api.service';
import { CancelService } from './app/core/services/cancel.service';
import { LocalStorageService } from './app/services/local-storage.service';
import { UserApiService } from './app/profile/services/user-api.service';
import { AppComponent } from './app/containers/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    //provideRouter(routes),

    /**
     * provideStore is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * reducers, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store based 
     * application.
     */
    provideStore({
      [fromAuth.featureKey]: fromAuth.reducer,
      [fromLayout.featureKey]: fromLayout.reducer,
      [fromKnittable.featureKey]: fromKnittable.reducer,
      [fromTest.featureKey]: fromTest.reducer,
      [fromFirmware.featureKey]: fromFirmware.reducer,
     }),

    /**
     * @ngrx/router-store keeps router state up-to-date in the store and uses
     * the store as the single source of truth for the router's state.
     */
    // provideRouterStore(),

    /**
     * Enable debugging using Redux Devtools extension for Chrome or Firefox.
     *
     * See: https://github.com/zalmoxisus/redux-devtools-extension
     */
    provideStoreDevtools(),

    /**
     * Register effects using standalone API.
     *
     * See: https://ngrx.io/guide/effects#using-the-standalone-api
     */
    provideEffects([
      AuthEffects, 
      UserEffects,
    ]),

    /**
     * Register services.
     */
    ApiService,
    AuthApiService,
    CancelService,
    LocalStorageService,
    UserApiService,
  ],
}).catch(err => console.error(err));
