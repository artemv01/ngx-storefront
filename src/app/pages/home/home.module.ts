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

import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { ReviewSliderComponent } from '@app/ui-control/review-slider/review-slider.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto',
};

@NgModule({
  declarations: [HomeComponent, ReviewSliderComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    UiControlModule,
    SwiperModule,
    StoreModule.forFeature(
      fromHomePageState.homePageStateFeatureKey,
      fromHomePageState.reducer
    ),
    EffectsModule.forFeature([HomePageStateEffects]),
    // SlickCarouselModule,
  ],
  providers: [
    HomePageResolver,
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG,
    },
  ],
})
export class HomeModule {}
