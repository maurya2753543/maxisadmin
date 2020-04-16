import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LeftMenuComponent } from './left-menu/left-menu.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [LeftMenuComponent],
  exports: [LeftMenuComponent]
})
export class SharedModule { }