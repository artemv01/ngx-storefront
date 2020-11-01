import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil, mergeMap } from 'rxjs/operators';
import { Subject, forkJoin } from 'rxjs';

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

  postReviewLoading = false;

  addToCartQuantity = 1;

  captchaToken = '';
  reviewForm = this.fb.group({
    authorName: ['', [Validators.required]],
    authorEmail: ['', [Validators.required, Validators.email]],
    content: ['', [Validators.required]],
    rating: [0, [Validators.required]],
  });
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
    public loading: LoadingService,
    public cart: CartService,
    public notify: NotificationService,
    private titleServ: TitleService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.destroy)).subscribe((params) => {
      this.productId = params.get('id');
      if (!this.productId) {
        // TODO!
      }
      this.loading.show();
      forkJoin({
        product: this.productService.getOne(this.productId),
        relatedProducts: this.productService.related(this.productId),
      }).subscribe(({ product, relatedProducts }) => {
        this.product = product;
        this.relatedProducts = relatedProducts;
        this.breadcrumbs = [];
        if (product.categories?.length) {
          this.breadcrumbs.push([
            product.categories[0].name,
            ['/products', product._id],
          ]);
        }
        this.breadcrumbs.push([product.name, ['/products', product._id]]);
        this.titleServ.set(product.name);
        this.loading.hide();
      });
    });
  }

  ngAfterViewInit() {}

  //   onRate(rating: number) {
  //     this.submittedRating = rating;
  //   }

  submitReview() {
    this.postReviewLoading = true;
    const reviewData = {
      ...this.reviewForm.value,
      productId: this.productId,
      captcha: this.captchaToken,
    };
    this.reviewQuery
      .submit(reviewData)
      .pipe(mergeMap(() => this.reviewQuery.forProduct(this.productId)))
      .subscribe((result) => {
        // this.isReviewSubmitted = true;
        this.reviewForm.reset();
        this.product.reviews = result.reviews;
        this.product.ratingCount = result.ratingCount;
        this.product.rating = result.rating;
        this.notify.push({ message: 'Your review has been submitted!' });
        this.reCaptcha.reset();
        this.postReviewLoading = false;
      });
  }

  addToCartFromGallery(product: Product) {
    const { _id, image, name } = product;
    let price = product.onSale ? product.salePrice : product.price;
    this.cart.add(({
      _id,
      image,
      name,
      price,
      quantity: 1,
    } as unknown) as Product);
  }

  addToCart() {
    const { _id, image, name } = this.product;
    let price = this.product.onSale
      ? this.product.salePrice
      : this.product.price;
    this.cart.add(({
      _id,
      image,
      name,
      price,
      quantity: this.addToCartQuantity,
    } as unknown) as Product);

    this.notify.push({
      showMessage: 'addToCartSuccess',
    });
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
    console.log(result);
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