import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Product } from 'src/app/type/product';
import { Review } from 'src/app/type/review';
import { Category } from 'src/app/type/category';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { LoadingService } from '@app/service/loading.service';
import { TitleService } from '@app/service/title.service';
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
    private api: ApiService,
    private loading: LoadingService,
    private titleServ: TitleService
  ) {}
  topRated: Product[] = [];

  ngOnInit(): void {
    this.loading.show();
    forkJoin({
      onSale: this.api.getProductsOnSale(),
      topRated: this.api.getTopRatedProducts(),
      reviews: this.api.getRecentReviews(),
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
