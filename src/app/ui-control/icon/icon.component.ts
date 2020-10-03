import { Attribute, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent implements OnInit {
  @Input('color') color = 'primary';
  @Input('size') size = 'xs';
  @Input('opacity') opacity = 1;
  colors = {
    primary: 'var(--txPrimary)',
    white: 'white',
  };
  sizes = {
    xs: '18px',
    sm: '24px',
    lg: '36px',
    xl: '48px',
  };
  constructor(@Attribute('title') title = '') {}
  ngOnInit(): void {}
}
