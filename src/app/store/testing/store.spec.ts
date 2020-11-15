import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import { TestBed } from '@angular/core/testing';
import { CategoryService } from '@app/services/category.service';
import { ProductsService } from '@app/services/products.service';
import { TestUtilModule } from '@app/test-util/test-util.module';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store } from '@ngrx/store';

import {
  loadCategories,
  loadCategoriesSuccess,
  loadingOff,
  loadingOn,
} from '../actions';
import { GlobalEffects } from '../effects';
import { CATEGORIES } from './global-mocks';

describe('ShopStore effects', () => {
  const storeSpy = jasmine.createSpyObj('store', ['select', 'dispatch']);
  const categoryServiceSpy = jasmine.createSpyObj('CategoryService', [
    'getMany',
  ]);
  const productServiceSpy = jasmine.createSpyObj('ProductService', ['getMany']);
  let productService: any;
  let categoryService: any;

  let store: any;
  let actions$: Observable<any>;
  let effects: GlobalEffects;
  let orderService: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [TestUtilModule],
      providers: [
        GlobalEffects,
        provideMockActions(() => actions$),
        { provide: Store, useValue: storeSpy },
        { provide: CategoryService, useValue: categoryServiceSpy },
        { provide: ProductsService, useValue: productServiceSpy },
      ],
    }).compileComponents();

    store = TestBed.inject(Store);
    categoryService = TestBed.inject(CategoryService);
    productService = TestBed.inject(ProductsService);
  });

  it('loads categories - loadCategories$', () => {
    const cats$ = cold('a', { a: CATEGORIES });
    categoryService.getMany.and.returnValue(cats$);

    const expected = loadCategoriesSuccess({ payload: CATEGORIES });
    const expected$ = cold('b', { b: expected });

    const action = loadCategories();
    actions$ = hot('a', { a: action });
    effects = TestBed.inject(GlobalEffects);

    expect(effects.loadCategories$).toBeObservable(expected$);
    expect(store.dispatch).toHaveBeenCalledWith(loadingOn());
    expect(store.dispatch).toHaveBeenCalledWith(loadingOff());
  });

  it('loads search results - loadSearch$', () => {
    const cats$ = cold('a', { a: CATEGORIES });
    categoryService.getMany.and.returnValue(cats$);

    const expected = loadCategoriesSuccess({ payload: CATEGORIES });
    const expected$ = cold('b', { b: expected });

    const action = loadCategories();
    actions$ = hot('a', { a: action });
    effects = TestBed.inject(GlobalEffects);

    expect(effects.loadCategories$).toBeObservable(expected$);
    expect(store.dispatch).toHaveBeenCalledWith(loadingOn());
    expect(store.dispatch).toHaveBeenCalledWith(loadingOff());
  });
});
