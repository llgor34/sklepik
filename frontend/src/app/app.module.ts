import { APP_INITIALIZER, NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { initializeApp } from './app.initializer';
import { AuthService } from './auth.service';
import { SellProductsComponent } from './pages/sell-products/sell-products.component';
import { RaportComponent } from './pages/raport/raport.component';
import { ArchiveComponent } from './pages/archive/archive.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { RoleDirective } from './directives/role.directive';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { ClosementProtocolComponent } from './pages/raport/closement-protocol/closement-protocol.component';
import { SellDefaultComponent } from './pages/sell-default/sell-default.component';
import { CardTableComponent } from './component/card-table/card-table.component';
import { SellCoffeeSubscribersComponent } from './pages/sell-coffee-subscribers/sell-coffee-subscribers.component';
import { lastElementOfArray } from './pipes/last-use-of-subscription.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    SidebarComponent,
    SellProductsComponent,
    RaportComponent,
    ArchiveComponent,
    OrdersComponent,
    RoleDirective,
    ClosementProtocolComponent,
    SellDefaultComponent,
    CardTableComponent,
    SellCoffeeSubscribersComponent,
    lastElementOfArray,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AuthService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
