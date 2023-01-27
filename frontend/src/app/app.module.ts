import { APP_INITIALIZER, NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { initializeApp } from './app.initializer';
import { AuthService } from './auth.service';
import { SellComponent } from './pages/sell/sell.component';
import { RaportComponent } from './pages/raport/raport.component';
import { ArchiveComponent } from './pages/archive/archive.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { RolesPipe } from './pipes/roles.pipe';
import { RoleDirective } from './directives/role.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    SidebarComponent,
    SellComponent,
    RaportComponent,
    ArchiveComponent,
    OrdersComponent,
    RolesPipe,
    RoleDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
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
