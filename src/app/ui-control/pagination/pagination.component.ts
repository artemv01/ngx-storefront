import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  ElementRef,
} from '@angular/core';
import { PaginationParams } from '@app/type/pagination-params';
import { ProductFilterQuery } from '@app/type/product-filter-query';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input('pagesTotal') pagesTotal: number;
  @Input('currentPage') currentPage: number;
  @Input('pageRangeLimit') pageRangeLimit = 4;
  @Input('loading') loading = false;
  @Output('change') onChange = new EventEmitter();

  rangeSymbol = '...';

  showPagination: boolean;
  paginationButtons = [];
  showNextBtn = false;
  showPrevBtn = false;
  constructor(public host: ElementRef) {}

  ngOnInit(): void {
    if (this.currentPage && this.pagesTotal) {
      this.calculatePagination();
    }
  }

  ngOnChanges(): void {
    if (this.currentPage && this.pagesTotal) {
      this.calculatePagination();
    }
  }

  get isDisabled() {
    return this.host.nativeElement?.attributes?.disabled?.value === 'true';
  }

  calculatePagination() {
    let rangeStart,
      rangeEnd,
      showEllipsis = false;
    if (this.currentPage % this.pageRangeLimit) {
      let mp = Math.trunc(this.currentPage / this.pageRangeLimit); // get multiplier

      if (mp === 0) {
        // we're in first range
        rangeStart = 1;
        rangeEnd = this.pageRangeLimit;
      } else {
        rangeStart = mp * this.pageRangeLimit;
        rangeEnd = rangeStart + (this.pageRangeLimit - 1);
      }
    } else {
      rangeStart = this.currentPage;
      rangeEnd = rangeStart + (this.pageRangeLimit - 1);
      rangeEnd = rangeEnd > this.pagesTotal ? this.pagesTotal : rangeEnd;
    }

    this.paginationButtons = [];
    if (rangeEnd < this.pagesTotal) {
      showEllipsis = true;
    }
    for (let i = rangeStart; i <= rangeEnd; i++) {
      this.paginationButtons.push(i);
    }
    if (showEllipsis) {
      this.paginationButtons.push(this.rangeSymbol, this.pagesTotal);
    }
    this.showNextBtn = this.currentPage < this.pagesTotal;
    this.showPrevBtn = this.currentPage > 1;
  }

  getPrevPage() {
    if (this.isDisabled) {
      return;
    }
    let newPage;
    if (this.currentPage - 1 < 1) {
      newPage = 1;
    } else {
      newPage = this.currentPage - 1;
    }
    this.onChange.emit(newPage);
  }
  getNextPage() {
    if (this.isDisabled) {
      return;
    }
    let newPage;
    if (this.currentPage + 1 > this.pagesTotal) {
      newPage = this.pagesTotal;
    } else {
      newPage = this.currentPage + 1;
    }
    this.onChange.emit(newPage);
  }
  goToPage(page: number | string) {
    if (this.isDisabled) {
      return;
    }
    if (page === this.rangeSymbol) {
      return;
    }
    const newPage = page as number;
    this.onChange.emit(newPage);
  }
}
