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
import { SellCoffeeSubscribersComponent } from './pages/sell-coffee-subscribers/sell-coffee-subscribers.component';
import { ClosementProtocolResolver } from './pages/raport/closement-protocol/closement-protocol.resolver';
import { HoursSettlementComponent } from './pages/hours-settlement/hours-settlement.component';
import { AddHoursComponent } from './pages/hours-settlement/add-hours/add-hours.component';
import { RoleGuard } from './guards/role.guard';

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
                    {
                        path: 'coffee-subscribers',
                        component: SellCoffeeSubscribersComponent,
                    },
                ],
            },
            {
                path: 'orders',
                component: OrdersComponent,
            },
            {
                path: 'raport',
                children: [
                    {
                        path: '',
                        component: RaportComponent,
                    },
                    {
                        path: 'closement-protocol',
                        component: ClosementProtocolComponent,
                        resolve: {
                            products: ClosementProtocolResolver,
                        },
                    },
                ],
            },
            {
                path: 'archive',
                component: ArchiveComponent,
            },
            {
                path: 'hours-settlement',
                children: [
                    {
                        path: '',
                        component: HoursSettlementComponent,
                    },
                    {
                        path: 'add',
                        component: AddHoursComponent,
                    },
                ],
                canActivateChild: [RoleGuard],
                data: {
                    roles: ['admin'],
                },
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
