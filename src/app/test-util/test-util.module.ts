import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from '@app/ui-control/breadcrumbs/breadcrumbs.component';
import { ButtonComponent } from '@app/ui-control/button/button.component';
import { CartTableComponent } from '@app/ui-control/cart-table/cart-table.component';
import { CartComponent } from '@app/ui-control/cart/cart.component';
import { CategoryGridComponent } from '@app/ui-control/category-grid/category-grid.component';
import { IconComponent } from '@app/ui-control/icon/icon.component';
import { InputComponent } from '@app/ui-control/input/input.component';
import { LazyLoadDirective } from '@app/ui-control/lazy-load.directive';
import { NotificationsComponent } from '@app/ui-control/notifications/notifications.component';
import { PaginationComponent } from '@app/ui-control/pagination/pagination.component';
import { PriceComponent } from '@app/ui-control/price/price.component';
import { ProductGridComponent } from '@app/ui-control/product-grid/product-grid.component';
import { RateItemComponent } from '@app/ui-control/rate-item/rate-item.component';
import { ReviewSliderComponent } from '@app/ui-control/review-slider/review-slider.component';
import { ReviewsComponent } from '@app/ui-control/reviews/reviews.component';
import { SaleLabelComponent } from '@app/ui-control/sale-label/sale-label.component';
import { SelectInputComponent } from '@app/ui-control/select-input/select-input.component';
import { StarRatingComponent } from '@app/ui-control/star-rating/star-rating.component';
import { TextareaComponent } from '@app/ui-control/textarea/textarea.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

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
    CartTableComponent,
  ],
  imports: [CommonModule, NoopAnimationsModule, FormsModule],
  exports: [
    CommonModule,
    NoopAnimationsModule,
    FormsModule,

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
    CartTableComponent,
  ],
})
export class TestUtilModule {}
