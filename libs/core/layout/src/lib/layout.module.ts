import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { Route, RouterModule } from '@angular/router';
import { BodyComponent } from './body/body.component';
import { MatButtonModule } from '@angular/material/button';

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
  imports: [CommonModule, RouterModule.forChild(routes), MatButtonModule],
  declarations: [HeaderComponent, MainComponent, BodyComponent],
})
export class LayoutModule {}
