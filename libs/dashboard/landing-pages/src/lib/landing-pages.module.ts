import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewHomeComponent } from './view-home/view-home.component';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
  {
    path: 'home',
    component: ViewHomeComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [ViewHomeComponent],
})
export class LandingPagesModule {}
