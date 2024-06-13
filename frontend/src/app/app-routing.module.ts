import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { NotAuthenticatedGuard } from './guards/not-authenticated.guard';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { RaportClosementComponent } from './pages/raport-closement/raport-closement.component';
import { RaportComponent } from './pages/raport-default/raport.component';
import { SellProductsComponent } from './pages/sell-products/sell-products.component';
import { SellDefaultComponent } from './pages/sell-default/sell-default.component';
import { PanelHoursSettlementComponent } from './pages/panel-hours-settlement/panel-hours-settlement.component';
import { RoleGuard } from './guards/role.guard';
import { OrdersPublicComponent } from './pages/orders-public/orders-public.component';
import { NotAuthenticatedLayoutComponent } from './component/not-authenticated-layout/not-authenticated-layout.component';
import { AuthenticatedLayoutComponent } from './component/authenticated-layout/authenticated-layout.component';
import { PanelDefaultComponent } from './pages/panel-default/panel-default.component';
import { PanelProductsComponent } from './pages/panel-products/panel-products.component';
import { PanelUsersComponent } from './pages/panel-users/panel-users.component';
import { TypedRoutes } from './interfaces/typed-routes.interface';

const routes: TypedRoutes = [
    {
        path: '',
        component: NotAuthenticatedLayoutComponent,
        children: [
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
                path: 'orders-public',
                component: OrdersPublicComponent,
            },
        ],
    },
    {
        path: '',
        component: AuthenticatedLayoutComponent,
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
                children: [
                    {
                        path: '',
                        component: RaportComponent,
                    },
                    {
                        path: 'closement-protocol',
                        component: RaportClosementComponent,
                    },
                ],
            },
            {
                path: 'panel',
                canActivateChild: [RoleGuard],
                children: [
                    {
                        path: '',
                        component: PanelDefaultComponent,
                    },
                    {
                        path: 'products',
                        component: PanelProductsComponent,
                    },
                    {
                        path: 'users',
                        component: PanelUsersComponent,
                    },
                    {
                        path: 'hours-settlement',
                        component: PanelHoursSettlementComponent,
                        canActivate: [RoleGuard],
                        data: {
                            roles: ['superAdmin'],
                        },
                    },
                ],
                data: {
                    roles: ['admin', 'superAdmin'],
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
