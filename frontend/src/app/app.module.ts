import { APP_INITIALIZER, NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { initializeApp } from './app.initializer';
import { AuthService } from './services/auth.service';
import { SellProductsComponent } from './pages/sell-products/sell-products.component';
import { RaportComponent } from './pages/raport/raport.component';
import { ArchiveComponent } from './pages/archive/archive.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { AllowedRolesDirective } from './directives/allowed-roles.directive';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { ClosementProtocolComponent } from './pages/raport/closement-protocol/closement-protocol.component';
import { SellDefaultComponent } from './pages/sell-default/sell-default.component';
import { CardTableComponent } from './component/card-table/card-table.component';
import { SellCoffeeSubscribersComponent } from './pages/sell-coffee-subscribers/sell-coffee-subscribers.component';
import { firstElementOfArray } from './pipes/first-element-of-array.pipe';
import { EditByValueFieldComponent } from './component/edit-by-value-field/edit-by-value-field.component';
import { FilterPipe } from './pipes/filter.pipe';
import { ToastrModule } from 'ngx-toastr';
import { HoursSettlementComponent } from './pages/hours-settlement/hours-settlement.component';
import { AddHoursComponent } from './pages/hours-settlement/add-hours/add-hours.component';
import { ConfirmButtonComponent } from './component/confirm-button/confirm-button.component';
import { TableStickyComponent } from './component/table-sticky/table-sticky.component';
import { FiltersComponent } from './component/filters/filters.component';
import { FilterByFnPipe } from './pipes/filter-by-fn.pipe';
import { OrderStatusPipe } from './pipes/order-status.pipe';
import { SearchFilterComponent } from './component/search-filter/search-filter.component';
import { DoneOrdersComponent } from './component/done-orders/done-orders.component';
import { OrderComponent } from './component/order/order.component';
import { OrdersPublicComponent } from './pages/orders-public/orders-public.component';
import { AuthenticatedLayoutComponent } from './component/authenticated-layout/authenticated-layout.component';
import { NotAuthenticatedLayoutComponent } from './component/not-authenticated-layout/not-authenticated-layout.component';
import { HttpProxyInterceptor } from './interceptors/http-proxy.interceptor';

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
        AllowedRolesDirective,
        ClosementProtocolComponent,
        SellDefaultComponent,
        CardTableComponent,
        SellCoffeeSubscribersComponent,
        firstElementOfArray,
        EditByValueFieldComponent,
        FilterPipe,
        HoursSettlementComponent,
        AddHoursComponent,
        ConfirmButtonComponent,
        TableStickyComponent,
        FiltersComponent,
        FilterByFnPipe,
        OrderStatusPipe,
        SearchFilterComponent,
        DoneOrdersComponent,
        OrderComponent,
        OrdersPublicComponent,
        AuthenticatedLayoutComponent,
        NotAuthenticatedLayoutComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            autoDismiss: true,
            positionClass: 'toast-bottom-right',
        }),
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpProxyInterceptor, multi: true },
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
