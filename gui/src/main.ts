/// <reference types="@angular/localize" />

// import required packages
import 'zone.js'
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
//import { provideRouter } from '@angular/router';

//import { routes } from './app/root/router';
import { Ui } from './app/ui/ui';
import { ApiService } from './app/services/api.service';
import { AuthService } from './app/services/auth.service';
import { UserService } from './app/services/user.service';
import { AuthMachineService } from './app/services/auth-machine/auth-machine.service';
import { GuiMachineService } from './app/services/gui-machine/gui-machine.service';
import { CancelService } from './app/services/cancel.service';
import { OptionsVisibilityService } from './app/services/optionsVisibility.service';
import { OptionsAvailabilityService } from './app/services/optionsAvailability.service';

bootstrapApplication(Ui, {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    //provideRouter(routes),
    ApiService,
    AuthService,
    UserService,
    AuthMachineService,
    GuiMachineService,
    OptionsVisibilityService,
    OptionsAvailabilityService,
    CancelService,
  ],
}).catch(err => console.error(err));
