import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { SearchService } from '@app/services/search.service';
import { NotificationService } from '@app/services/notification.service';
import { GlobalState } from '@app/store';
import { Store } from '@ngrx/store';
import { selectCategories } from '@app/store/selectors';
import { loadCategories } from '@app/store/actions';
import { CartState } from '@app/cart-store/cart.reducer';
import { selectTotalQuantity } from '@app/cart-store/cart.selectors';

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
  totalQuantity$: Observable<number>;

  constructor(
    public searchService: SearchService,
    public notify: NotificationService,
    private store: Store<GlobalState>,
    private cart: Store<CartState>
  ) {
    this.totalQuantity$ = cart.select(selectTotalQuantity);
  }

  ngOnInit(): void {
    this.store.dispatch(loadCategories());
    this.categoryList$ = this.store.select(selectCategories);
  }
  ngOnDestroy() {
    this.destroy.next(null);
  }
}
