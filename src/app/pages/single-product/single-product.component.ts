import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil, mergeMap, map, filter, first, tap } from 'rxjs/operators';
import { Subject, forkJoin, Observable } from 'rxjs';

import { Product } from '@app/models/product';
import { CartService } from '@app/services/cart.service';
import { environment } from '@root/environments/environment';
import { Category } from '@app/models/category';
import { FormBuilder, Validators } from '@angular/forms';
import { LoadingService } from '@app/services/loading.service';
import { NotificationService } from '@app/services/notification.service';
import { Breadcrumbs } from '@app/models/breadcrumbs';
import { TitleService } from '@app/services/title.service';
import { RecaptchaComponent } from 'ng-recaptcha';
import { ProductsService } from '@app/services/products.service';
import { ReviewService } from '@app/services/review.service';
import { Store } from '@ngrx/store';

import { Review } from '@app/models/review';
import {
  selectRelatedProducts,
  selectReviewLoading,
  selectSingleProduct,
  selectSingleProductPage,
} from './store/single-product.selectors';
import { SingleProductState } from './store/single-product.reducer';
import { createReview } from './store/single-product.actions';
import { CartState } from '@app/cart-store/cart.reducer';
import * as CartSelectors from '@app/cart-store/cart.actions';
import { ProductInCart } from '@app/models/product-in-cart';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss'],
})
export class SingleProductComponent
  implements OnInit, OnDestroy, AfterViewInit {
  environment = environment;
  @ViewChild('submitReviewBtn', { read: ElementRef }) submitReviewBtn;
  @ViewChild('reCaptcha', { read: RecaptchaComponent }) reCaptcha;
  breadcrumbs: Breadcrumbs[] = [];
  destroy: Subject<null> = new Subject();
  productId: string;
  product: Product = {} as Product;
  relatedProducts: Product[] = [];
  allCategories: Category[] = [];
  isReviewSubmitted: boolean = false;

  postReviewLoading$: Observable<boolean>;

  addToCartQuantity = 1;

  captchaToken = 'abc   ';
  reviewForm = this.fb.group({
    authorName: ['', [Validators.required]],
    authorEmail: ['', [Validators.required, Validators.email]],
    content: ['', [Validators.required]],
    rating: [0, [Validators.required]],
  });

  product$: Observable<Product>;
  related$: Observable<Product[]>;
  get authorName() {
    return this.reviewForm.get('authorName');
  }
  get authorEmail() {
    return this.reviewForm.get('authorEmail');
  }
  get content() {
    return this.reviewForm.get('content');
  }
  get rating() {
    return this.reviewForm.get('rating');
  }
  validatorConfig = {
    name: {
      required: 'Name is required',
    },
    email: {
      required: 'Email is required',
      email: 'Invalid email',
    },
    content: {
      required: 'Review is required',
    },
  };

  constructor(
    private route: ActivatedRoute,
    private reviewQuery: ReviewService,
    private productService: ProductsService,
    private fb: FormBuilder,
    public notify: NotificationService,
    private store: Store<SingleProductState>,
    private cartStore: Store<CartState>,
    private titleServ: TitleService
  ) {
    this.product$ = store.select(selectSingleProduct);
    this.related$ = store.select(selectRelatedProducts);
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.destroy)).subscribe((params) => {
      this.productId = params.get('id');
    });
    this.postReviewLoading$ = this.store.select(selectReviewLoading);
  }

  ngAfterViewInit() {}

  submitReview() {
    const reviewData: Review = {
      ...this.reviewForm.value,
      productId: this.productId,
      captcha: this.captchaToken,
    };
    this.store.dispatch(createReview({ payload: reviewData }));
    this.reviewForm.reset();
    this.reCaptcha.reset();
  }

  addToCartFromGallery(product: Product) {
    this.product$.pipe(
      filter((product) => !!product),
      first(),
      map((product) => {
        const { _id, image, name } = product;
        let price = product.onSale ? product.salePrice : product.price;

        return {
          _id,
          image,
          name,
          price,
          quantity: 1,
        };
      }),
      map((product: ProductInCart) =>
        this.store.dispatch(CartSelectors.addItem({ payload: product }))
      )
    );
  }

  addToCart() {
    this.store
      .select(selectSingleProduct)
      .pipe(
        filter((product) => !!product),

        first(),
        map((product) => {
          const { _id, image, name } = product;
          let price = product.onSale ? product.salePrice : product.price;

          return {
            _id,
            image,
            name,
            price,
            quantity: this.addToCartQuantity,
          };
        }),
        map((product: ProductInCart) =>
          this.store.dispatch(CartSelectors.addItem({ payload: product }))
        )
      )
      .subscribe();
  }

  zoomImage(e) {
    if (!this.product.image) {
      return;
    }
    let zoomer = e.currentTarget;
    let offsetX, offsetY;
    if (e.offsetX) {
      offsetX = e.offsetX;
    } else {
      offsetX = e.touches[0].pageX;
    }
    if (e.offsetY) {
      offsetY = e.offsetY;
    } else {
      offsetY = e.touches[0].pageX;
    }

    const x = (offsetX / zoomer.offsetWidth) * 100;
    const y = (offsetY / zoomer.offsetHeight) * 100;
    zoomer.style.backgroundPosition = x + '% ' + y + '%';
  }

  captchaEvent(result: string) {
    this.captchaToken = result;
  }

  scrollTo($el) {
    $el.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }

  ngOnDestroy() {
    this.notify.dismissAll();
    this.destroy.next(null);
  }
}
