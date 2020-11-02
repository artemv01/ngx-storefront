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
import { Observable, Subject } from 'rxjs';

import { CartService } from '@app/services/cart.service';
import { SearchService } from '@app/services/search.service';
import { NotificationService } from '@app/services/notification.service';
import { Router } from '@angular/router';
import { CategoryService } from '@app/services/category.service';
import { ShopState } from '@app/store';
import { Store } from '@ngrx/store';
import { ShopActions } from '@app/store/actions';
import { selectCategories } from '@app/store/selectors';

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
  @ViewChild('header') header: ElementRef;
  @Input('routeChange$') routeChange$: Subject<null>;

  destroy = new Subject();
  categoryList$: Observable<Category[]>;
  constructor(
    public cart: CartService,
    public searchService: SearchService,
    public notify: NotificationService,
    private store: Store<ShopState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(ShopActions.loadCategories());
    this.categoryList$ = this.store.select(selectCategories);
  }
  ngOnDestroy() {
    this.destroy.next(null);
  }
}
