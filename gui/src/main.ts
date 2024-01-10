/// <reference types="@angular/localize" />

// import required packages
import 'zone.js'
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
//import { provideRouter } from '@angular/router';

//import { routes } from './app/root/router';
import { AppComponent } from './app/root/app-root/app-root';
import { ApiService } from './app/services/api.service';
import { AuthService } from './app/services/auth.service';
import { UserService } from './app/services/user.service';
import { CancelService } from './app/services/cancel.service';
//import { SubmitService } from './app/services/_submit.service';

// FIXME remove this in production
//localStorage.removeItem('userData');

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    //provideRouter(routes),
    ApiService,
    AuthService,
    UserService,
    CancelService,
    //SubmitService,
  ],
}).catch(err => console.error(err));
