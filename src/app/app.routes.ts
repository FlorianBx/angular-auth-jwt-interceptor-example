import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AdminComponent } from './pages/admin/admin.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UserGrowthChartComponent } from './features/user-growth-chart/user-growth-chart.component';
import { UsersListComponent } from './features/users-list/users-list.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'chart', pathMatch: 'full' },
      { path: 'chart', component: UserGrowthChartComponent },
      { path: 'users', component: UsersListComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
