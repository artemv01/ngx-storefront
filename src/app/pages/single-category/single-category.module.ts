import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingleCategoryRoutingModule } from './single-category-routing.module';
import { SingleCategoryComponent } from './single-category.component';
import { UiControlModule } from '@app/ui-control/ui-control.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SingleCategoryPageEffects } from '@app/pages/single-category/store/single-category-page.effects';
import * as fromSingleCategoryPage from '@app/pages/single-category/store/single-category-page.reducer';

@NgModule({
  declarations: [SingleCategoryComponent],
  imports: [
    UiControlModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SingleCategoryRoutingModule,
    StoreModule.forFeature(
      fromSingleCategoryPage.singleCategoryPageFeatureKey,
      fromSingleCategoryPage.reducer
    ),
    EffectsModule.forFeature([SingleCategoryPageEffects]),
  ],
})
export class SingleCategoryModule {}
