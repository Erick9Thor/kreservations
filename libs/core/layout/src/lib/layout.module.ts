import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { BodyComponent } from './body/body.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, MatButtonModule, RouterModule],
  declarations: [HeaderComponent, MainComponent, BodyComponent],
  exports: [MainComponent],
})
export class LayoutModule {}
