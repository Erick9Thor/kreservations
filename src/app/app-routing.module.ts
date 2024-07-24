import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [];

@NgModule({
  imports: [
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
