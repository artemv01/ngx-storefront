import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SingleProductPageResolver } from './single-product-page.resolver';
import { SingleProductComponent } from './single-product.component';
const routes: Routes = [
  {
    path: '',
    component: SingleProductComponent,
    resolve: { data: SingleProductPageResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleProductRoutingModule {}
