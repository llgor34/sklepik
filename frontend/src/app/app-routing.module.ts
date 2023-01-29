import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { NotAuthenticatedGuard } from './guards/not-authenticated.guard';
import { ArchiveComponent } from './pages/archive/archive.component';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { RaportComponent } from './pages/raport/raport.component';
import { SellComponent } from './pages/sell/sell.component';

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
        component: SellComponent,
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
