import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { LayoutModule, MainComponent } from '@kreservations/layout';

const routes: Route[] = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('@kreservations/landing-pages').then(
            (m) => m.LandingPagesModule
          ),
      },
      {
        path: 'reservations',
        loadChildren: () =>
          import('@kreservations/view-reservations').then(
            (m) => m.ViewReservationsModule
          ),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [
    LayoutModule,
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking',
      paramsInheritanceStrategy: 'always',
    }),
  ],
  exports: [RouterModule],
  providers: [provideHttpClient()], // add it here
})
export class AppRoutingModule {}
