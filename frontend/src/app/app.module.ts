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
import { RequiredRolesDirective } from './directives/required-roles.directive';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { ClosementProtocolComponent } from './pages/raport/closement-protocol/closement-protocol.component';
import { SellDefaultComponent } from './pages/sell-default/sell-default.component';
import { CardTableComponent } from './component/card-table/card-table.component';
import { firstElementOfArray } from './pipes/first-element-of-array.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { ToastrModule } from 'ngx-toastr';
import { PanelHoursSettlementComponent } from './pages/panel-hours-settlement/panel-hours-settlement.component';
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
import { PaginatorComponent } from './component/paginator/paginator.component';
import { NumeratePipe } from './pipes/numerate.pipe';
import { LessonTimePipe } from './pipes/lesson-time.pipe';
import { ListTableComponent } from './component/list-table/list-table.component';
import { TypedTemplateDirective } from './directives/typed-template.directive';
import { PanelDefaultComponent } from './pages/panel-default/panel-default.component';
import { PanelProductsComponent } from './pages/panel-products/panel-products.component';
import { EditableValueFieldComponent } from './component/editable-value-field/editable-value-field.component';
import { NewProductComponent } from './pages/panel-products/new-product/new-product.component';
import { PanelUsersComponent } from './pages/panel-users/panel-users.component';
import { PanelComponent } from './component/panel/panel.component';
import { NewRecordComponent } from './component/new-record/new-record.component';
import { NewUserComponent } from './pages/panel-users/new-user/new-user.component';
import { MultipleSelectFieldComponent } from './component/multiple-select-field/multiple-select-field.component';
import { EncryptPipe } from './pipes/encrypt.pipe';
import { NewHoursSettlementComponent } from './pages/panel-hours-settlement/new-hours-settlement/new-hours-settlement.component';
import { DefaultValuePipe } from './pipes/default-value.pipe';
import { EditableListFieldComponent } from './component/editable-list-field/editable-list-field.component';
import { EditableFieldComponent } from './component/editable-field/editable-field.component';
import { FocusWhenDisplayedDirective } from './directives/focus-when-displayed.directive';
import { AnimateOnEnterDirective } from './directives/animate-on-enter.directive';
import { SellmentCloseRaportComponent } from './component/sellment-close-raport/sellment-close-raport.component';

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
        RequiredRolesDirective,
        ClosementProtocolComponent,
        SellDefaultComponent,
        CardTableComponent,
        firstElementOfArray,
        FilterPipe,
        PanelHoursSettlementComponent,
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
        PaginatorComponent,
        NumeratePipe,
        LessonTimePipe,
        ListTableComponent,
        TypedTemplateDirective,
        PanelDefaultComponent,
        PanelProductsComponent,
        EditableValueFieldComponent,
        NewProductComponent,
        PanelUsersComponent,
        PanelComponent,
        NewRecordComponent,
        NewUserComponent,
        MultipleSelectFieldComponent,
        EncryptPipe,
        NewHoursSettlementComponent,
        DefaultValuePipe,
        EditableListFieldComponent,
        EditableFieldComponent,
        FocusWhenDisplayedDirective,
        AnimateOnEnterDirective,
        SellmentCloseRaportComponent,
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
        }),
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
