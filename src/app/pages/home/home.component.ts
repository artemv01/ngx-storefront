import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { environment } from 'src/environments/environment';
import { Product } from 'src/app/type/product';
import { Review } from 'src/app/type/review';
import { Category } from 'src/app/type/category';
import { forkJoin } from 'rxjs';
import { LoadingService } from '@app/service/loading.service';
import { tap } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  categories: Category[] = [];
  reviews: Review[] = [];
  saleProducts: Product[] = [];
  //   slideConfig = { slidesToShow: 2, slidesToScroll: 2 };

  constructor(private api: ApiService, private loading: LoadingService) {}
  topRated: Product[] = [];
  REVIEWS = [
    {
      rating: 3,
      content: 'Labore anim nostrud tempor culpa do nisi aliquip eu.',
      authorName: 'Perry',
      authorEmail: 'petersonperry@aquacine.com',
      createdAt:
        'Sat Mar 12 1977 22:42:01 GMT+0500 (Yekaterinburg Standard Time)',
    },
    {
      rating: 3,
      content: 'Aliqua laborum culpa fugiat est nisi proident consectetur.',
      authorName: 'Wallace',
      authorEmail: 'petersonwallace@aquacine.com',
      createdAt:
        'Mon Dec 25 1989 00:59:05 GMT+0500 (Yekaterinburg Standard Time)',
    },
    {
      rating: 3,
      content: 'Officia non deserunt ex elit tempor aliqua officia esse.',
      authorName: 'Melendez',
      authorEmail: 'petersonmelendez@aquacine.com',
      createdAt:
        'Sun Mar 08 1987 17:05:39 GMT+0500 (Yekaterinburg Standard Time)',
    },
    {
      rating: 3,
      content: 'Amet est sit voluptate mollit nostrud.',
      authorName: 'Rodgers',
      authorEmail: 'petersonrodgers@aquacine.com',
      createdAt:
        'Wed Dec 26 2007 16:47:20 GMT+0500 (Yekaterinburg Standard Time)',
    },
    {
      rating: 3,
      content:
        'Culpa eiusmod ullamco veniam eiusmod pariatur excepteur nulla fugiat Lorem sunt occaecat qui.',
      authorName: 'Haynes',
      authorEmail: 'petersonhaynes@aquacine.com',
      createdAt:
        'Sat Apr 29 1978 00:29:51 GMT+0500 (Yekaterinburg Standard Time)',
    },
  ];
  ngOnInit(): void {
    this.loading.show();
    forkJoin({
      onSale: this.api.getProductsOnSale(),
      topRated: this.api.getTopRatedProducts(),
      reviews: this.api.getRecentReviews(),
    }).subscribe(({ onSale, topRated, reviews }) => {
      this.saleProducts = onSale;
      this.topRated = topRated;
      this.reviews = reviews;
      this.loading.hide();
    });
  }

  addToCart() {}
}
