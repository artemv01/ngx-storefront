import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewCartRoutingModule } from './view-cart-routing.module';
import { ViewCartComponent } from './view-cart.component';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UiControlModule } from '@app/ui-control/ui-control.module';

@NgModule({
  declarations: [ViewCartComponent],
  imports: [
    CommonModule,
    ViewCartRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    UiControlModule,
  ],
})
export class ViewCartModule {}
