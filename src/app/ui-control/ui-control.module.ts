import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { StarRatingComponent } from './star-rating/star-rating.component';
import { ButtonComponent } from './button/button.component';
import { ProductGridComponent } from './product-grid/product-grid.component';
import { CategoryGridComponent } from './category-grid/category-grid.component';
import { SaleLabelComponent } from './sale-label/sale-label.component';
import { PriceComponent } from './price/price.component';
import { InputComponent } from './input/input.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { TextareaComponent } from './textarea/textarea.component';
import { RateItemComponent } from './rate-item/rate-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './cart/cart.component';
import { RouterModule } from '@angular/router';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SelectInputComponent } from '@app/ui-control/select-input/select-input.component';
import { PaginationComponent } from './pagination/pagination.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { IconComponent } from './icon/icon.component';
import { ReviewSliderComponent } from './review-slider/review-slider.component';
import { LazyLoadDirective } from '@app/ui-control/lazy-load.directive';

@NgModule({
  declarations: [
    StarRatingComponent,
    ButtonComponent,
    ProductGridComponent,
    CategoryGridComponent,
    SaleLabelComponent,
    PriceComponent,
    InputComponent,
    ReviewsComponent,
    TextareaComponent,
    RateItemComponent,
    CartComponent,
    BreadcrumbsComponent,
    SelectInputComponent,
    PaginationComponent,
    NotificationsComponent,
    IconComponent,
    ReviewSliderComponent,
    LazyLoadDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SlickCarouselModule,
  ],
  exports: [
    StarRatingComponent,
    ButtonComponent,
    ProductGridComponent,
    CategoryGridComponent,
    SaleLabelComponent,
    PriceComponent,
    InputComponent,
    ReviewsComponent,
    TextareaComponent,
    RateItemComponent,
    CartComponent,
    BreadcrumbsComponent,
    SelectInputComponent,
    PaginationComponent,
    NotificationsComponent,
    IconComponent,
    ReviewSliderComponent,
    LazyLoadDirective,
  ],
})
export class UiControlModule {}
