// import required packages
import 'zone.js'
import { provideHttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
//import { provideRouter } from '@angular/router';

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import * as fromAuth from './app/modules/auth/reducers/auth.reducer';
import * as fromCore from './app/modules/core/reducers/core.reducer';
import * as fromKnit from './app/modules/knit/reducers/knit.reducer';
import * as fromTest from './app/modules/test-device/reducers/test.reducer';
import * as fromFirmware from './app/modules/firmware-upload/reducers/firmware.reducer';
import { AuthEffects } from './app/modules/auth/effects/auth.effects';
import { UserEffects } from './app/modules/profile/effects/user.effects';
import { ImageEffects } from './app/modules/core/effects/image.effects';

//import { routes } from './app/root/router';
import { ApiService } from './app/services/api.service';
import { AuthApiService } from './app/modules/auth/services/auth-api.service';
import { CancelService } from './app/modules/core/services/cancel.service';
import { LocalStorageService } from './app/services/local-storage.service';
import { UserApiService } from './app/modules/profile/services/user-api.service';
import { AppComponent } from './app/root/app.component';

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
      [fromCore.featureKey]: fromCore.reducer,
      [fromKnit.featureKey]: fromKnit.reducer,
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
      ImageEffects,
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
