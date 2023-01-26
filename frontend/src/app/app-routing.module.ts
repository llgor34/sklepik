import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { NotAuthenticatedGuard } from './guards/not-authenticated.guard';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    canMatch: [NotAuthenticatedGuard],
    component: LoginComponent,
  },
  {
    path: '',
    canMatch: [AuthenticatedGuard],
    children: [
      {
        path: 'main',
        component: MainComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
