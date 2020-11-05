import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleProductComponent } from './single-product.component';
import { UiControlModule } from '@app/ui-control/ui-control.module';
import { SingleProductRoutingModule } from './single-product-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RecaptchaModule } from 'ng-recaptcha';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromSingleProduct from '@app/pages/single-product/store/single-product.reducer';
import { SingleProductEffects } from '@app/pages/single-product/store/single-product.effects';

@NgModule({
  declarations: [SingleProductComponent],
  imports: [
    SingleProductRoutingModule,
    UiControlModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RecaptchaModule,
    StoreModule.forFeature(
      fromSingleProduct.singleProductFeatureKey,
      fromSingleProduct.reducer
    ),
    EffectsModule.forFeature([SingleProductEffects]),
  ],
})
export class SingleProductModule {}
