import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleProductComponent } from './single-product.component';
import { UiControlModule } from '@app/ui-control/ui-control.module';
import { SingleProductRoutingModule } from './single-product-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RecaptchaModule } from 'ng-recaptcha';

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
  ],
})
export class SingleProductModule {}
