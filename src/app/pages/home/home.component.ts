import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Review } from 'src/app/models/review';
import { Category } from 'src/app/models/category';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { LoadingService } from '@app/services/loading.service';
import { TitleService } from '@app/services/title.service';
import { ProductsService } from '@app/services/products.service';
import { ReviewService } from '@app/services/review.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  categories: Category[] = [];
  reviews$: BehaviorSubject<Review[]> = new BehaviorSubject([]);
  saleProducts: Product[] = [];
  //   slideConfig = { slidesToShow: 2, slidesToScroll: 2 };

  constructor(
    private productQuery: ProductsService,
    private reviewQuery: ReviewService,
    private loading: LoadingService,
    private titleServ: TitleService
  ) {}
  topRated: Product[] = [];

  ngOnInit(): void {
    this.loading.show();
    forkJoin({
      onSale: this.productQuery.onSale(),
      topRated: this.productQuery.topRated(),
      reviews: this.reviewQuery.recent(),
    }).subscribe(({ onSale, topRated, reviews }) => {
      this.saleProducts = onSale;
      this.topRated = topRated;
      this.reviews$.next(reviews);
      this.titleServ.set('Home');
      this.loading.hide();
    });
  }

  addToCart() {}
}