import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { ApiService } from '../../service/api.service';
import { CartService } from '@app/service/cart.service';
import { SearchService } from '@app/service/search.service';
import { NotificationService } from '@app/service/notification.service';

interface Category {
  _id: string;
  name: string;
  image?: string;
  productNumber?: number;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  // showCart = false
  @ViewChild('header') header: ElementRef;
  @Input('routeChange$') routeChange$: Subject<null>;

  destroy = new Subject();
  categoryList: Category[] = [];
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    public cart: CartService,
    public searchService: SearchService,
    public notify: NotificationService
  ) {}

  ngOnInit(): void {
    this.routeChange$.pipe(takeUntil(this.destroy)).subscribe(() => {
      this.header.nativeElement.classList.remove('menu-active');
    });
    this.api.getCategories('_id name').subscribe((cats: Category[]) => {
      this.categoryList = cats;
    });
  }
  ngOnDestroy() {
    this.destroy.next(null);
  }
}
