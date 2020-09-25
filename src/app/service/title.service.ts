import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  add = 'Storefront on Angular';
  constructor(private title: Title) {}

  public set(title: string = '') {
    this.title.setTitle(`${title} - ${this.add}`);
  }
}
