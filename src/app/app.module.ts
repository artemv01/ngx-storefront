import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  HttpClientJsonpModule,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GoogleMapsModule } from '@angular/google-maps';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShopComponent } from './pages/shop/shop.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './core/header/header.component';
import { UiControlModule } from './ui-control/ui-control.module';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './core/footer/footer.component';
import { StoreConfig, StoreModule } from '@ngrx/store';
import { reducers, featureKey } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { ShopEffects } from './store/effects';
import { EffectsModule } from '@ngrx/effects';
import * as fromCart from '@app/cart-store/cart.reducer';
import { CartEffects } from '@app/cart-store/cart.effects';

const storeConfig: any = {};
storeConfig[featureKey] = reducers;

@NgModule({
  declarations: [AppComponent, ShopComponent, HeaderComponent, FooterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    BrowserAnimationsModule,
    UiControlModule,
    RouterModule,
    GoogleMapsModule,
    StoreModule.forRoot(storeConfig),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([ShopEffects]),
    StoreModule.forFeature(fromCart.cartFeatureKey, fromCart.reducer),
    EffectsModule.forFeature([CartEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
