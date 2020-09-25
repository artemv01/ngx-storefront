import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewCartComponent } from './view-cart.component';

const routes: Routes = [
  {
    path: '',
    component: ViewCartComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewCartRoutingModule {}
