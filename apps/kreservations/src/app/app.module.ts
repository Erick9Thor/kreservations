import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer } from '@ngrx/router-store';

import * as fromStepper from '@kreservations/feature-stepper';
import { FeatureNotificationsModule } from '@kreservations/feature-notifications';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FeatureNotificationsModule,

    // STORE

    StoreModule.forRoot(
      {
        router: routerReducer,
      },
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
          strictStateSerializability: false,
          strictActionSerializability: false,
        },
      }
    ),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([]),

    // STEPPER STORE

    StoreModule.forFeature(
      fromStepper.STEPPER_FEATURE_KEY,
      fromStepper.reducer,
      {
        initialState: fromStepper.initialState,
      }
    ),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
