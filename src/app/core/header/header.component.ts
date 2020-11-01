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

import { CartService } from '@app/service/cart.service';
import { SearchService } from '@app/service/search.service';
import { NotificationService } from '@app/service/notification.service';
import { Router } from '@angular/router';
import { CategoryService } from '@app/service/category.service';

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
    private categoryQuery: CategoryService,
    public cart: CartService,
    public searchService: SearchService,
    public notify: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router.events.pipe(takeUntil(this.destroy)).subscribe(() => {
      this.header.nativeElement.classList.remove('menu-active');
    });
    this.categoryQuery.getMany().subscribe((cats: Category[]) => {
      this.categoryList = cats;
    });
  }
  ngOnDestroy() {
    this.destroy.next(null);
  }
}
