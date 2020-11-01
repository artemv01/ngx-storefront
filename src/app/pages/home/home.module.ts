import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiControlModule } from '@app/ui-control/ui-control.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HomePageResolver } from './home-page.resolver';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    UiControlModule,
    // SlickCarouselModule,
  ],
  providers: [HomePageResolver],
})
export class HomeModule {}
