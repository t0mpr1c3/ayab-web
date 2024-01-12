// import required packages
import 'zone.js'
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
//import { provideRouter } from '@angular/router';

import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

//import { routes } from './app/root/router';
import { AppComponent } from './app/containers/app/app.component';
import * as layout from './app/core/reducers/layout.reducer';
import * as test from './app/core/reducers/test.reducer';
import * as knit from './app/core/reducers/knit.reducer';
import { ApiService } from './app/core/services/api.service';
import { AuthService } from './app/core/services/auth.service';
import { UserService } from './app/core/services/user.service';
import { AuthMachineService } from './app/core/services/auth-machine/auth-machine.service';
import { ImageLoadedService } from './app/core/services/image-loaded.service';
import { CancelService } from './app/core/services/cancel.service';

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
      layout: layout.reducer,
      test: test.reducer,
      knit: knit.reducer, 
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
    // provideEffects([RouterEffects, AuthEffects]),

    ApiService,
    AuthService,
    UserService,
    AuthMachineService,
    ImageLoadedService,
    CancelService,
  ],
}).catch(err => console.error(err));
