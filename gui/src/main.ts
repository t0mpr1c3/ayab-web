// import required packages
import 'zone.js'
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
//import { provideRouter } from '@angular/router';

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import * as layout from './app/core/reducers/layout.reducer';
import * as test from './app/core/reducers/test.reducer';
import * as knit from './app/core/reducers/knit.reducer';
import * as auth from './app/auth/reducers/auth.reducer';
import { AuthEffects } from './app/auth/effects/auth.effects';

//import { routes } from './app/root/router';
import { AppComponent } from './app/containers/app.component';
import { ApiService } from './app/core/services/api.service';
import { AuthApiService } from './app/core/services/auth-api.service';
import { UserApiService } from './app/core/services/user-api.service';
import { AuthService } from './app/auth/services/auth.service';
//import { AuthMachineService } from './app/core/services/auth-xstate-machine/auth-machine.service';
import { ImageLoadedService } from './app/core/services/image-loaded.service';
import { SubmitService } from './app/core/services/submit.service';
import { CancelService } from './app/core/services/cancel.service';
import { UserEffects } from './app/core/effects/user.effects';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    //provideRouter(routes),

    /**
     * StoreModule.provideStore is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * reducers, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.
     */
    provideStore({ 
      [layout.featureKey]: layout.reducer,
      [test.featureKey]: test.reducer,
      [knit.featureKey]: knit.reducer, 
      [auth.featureKey]: auth.reducer, 
     }),

    /**
     * @ngrx/router-store keeps router state up-to-date in the store and uses
     * the store as the single source of truth for the router's state.
     */
    // provideRouterStore(),

    /**
     * Store devtools instrument the store retaining past versions of state
     * and recalculating new states. This enables powerful time-travel
     * debugging.
     *
     * To use the debugger, install the Redux Devtools extension for either
     * Chrome or Firefox
     *
     * See: https://github.com/zalmoxisus/redux-devtools-extension
     */
    provideStoreDevtools(),

    /**
     * EffectsModule.run() sets up the effects class to be initialized
     * immediately when the application starts.
     *
     * See: https://github.com/ngrx/effects/blob/master/docs/api.md#run
     */
    provideEffects([AuthEffects, UserEffects]),

    ApiService,
    AuthApiService,
    UserApiService,
    AuthService,
    //AuthMachineService,
    ImageLoadedService,
    SubmitService,
    CancelService,
  ],
}).catch(err => console.error(err));
