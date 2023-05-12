import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { NotAuthenticatedGuard } from './guards/not-authenticated.guard';
import { ArchiveComponent } from './pages/archive/archive.component';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ClosementProtocolComponent } from './pages/raport/closement-protocol/closement-protocol.component';
import { RaportComponent } from './pages/raport/raport.component';
import { SellProductsComponent } from './pages/sell-products/sell-products.component';
import { SellDefaultComponent } from './pages/sell-default/sell-default.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    canActivate: [NotAuthenticatedGuard],
    component: LoginComponent,
  },
  {
    path: '',
    canActivateChild: [AuthenticatedGuard],
    children: [
      {
        path: 'main',
        component: MainComponent,
      },
      {
        path: 'sell',
        children: [
          {
            path: '',
            component: SellDefaultComponent,
          },
          {
            path: 'products',
            component: SellProductsComponent,
          },
        ],
      },
      {
        path: 'orders',
        component: OrdersComponent,
      },
      {
        path: 'raport',
        component: RaportComponent,
      },
      {
        path: 'raport/closement-protocol',
        component: ClosementProtocolComponent,
      },
      {
        path: 'archive',
        component: ArchiveComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
