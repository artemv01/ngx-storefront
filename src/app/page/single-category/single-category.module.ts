import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingleCategoryRoutingModule } from './single-category-routing.module';
import { SingleCategoryComponent } from './single-category.component';
import { UiControlModule } from '@app/ui-control/ui-control.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SingleCategoryComponent],
  imports: [
    UiControlModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SingleCategoryRoutingModule,
  ],
})
export class SingleCategoryModule {}
