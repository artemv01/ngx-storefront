import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiControlModule } from '@app/ui-control/ui-control.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HomePageResolver } from './home-page.resolver';
import { StoreModule } from '@ngrx/store';
import * as fromHomePageState from './store/home-page.reducer';
import { EffectsModule } from '@ngrx/effects';
import { HomePageStateEffects } from './store/home-page.effects';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    UiControlModule,
    StoreModule.forFeature(
      fromHomePageState.homePageStateFeatureKey,
      fromHomePageState.reducer
    ),
    EffectsModule.forFeature([HomePageStateEffects]),
    // SlickCarouselModule,
  ],
  providers: [HomePageResolver],
})
export class HomeModule {}
