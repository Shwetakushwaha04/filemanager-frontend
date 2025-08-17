import { Routes } from '@angular/router';
import { StatsPanel } from './components/dashboard/stats-panel/stats-panel';
import { FileGrid } from './components/dashboard/file-grid/file-grid';
import { FileCard } from './components/dashboard/file-card/file-card';
import { FolderSection } from './components/folder-section/folder-section';
import { DashboardPage } from './components/dashboard/dashboard-page/dashboard-page';
import { LoginRegister } from './login-register/login-register';
import { AuthGuard } from './services/auth.guard';
import { MainLayoutComponent } from './components/layout/main-layout/main-layout';

export const routes: Routes = [
  // { path: 'dashboard', component: FileGrid },
  { path: 'auth', component: LoginRegister },
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
   {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardPage },
      { path: 'dashboard/folder/:id', component: FolderSection },
      { path: 'my-storage', component: FolderSection },
      { path: 'my-storage/folder/:id', component: FolderSection },
      { path: 'recent', component: FileCard },
      { path: 'shared-link', component: FileCard },
      { path: 'favorite', component: FileCard },
      { path: 'trash', component: FileCard }
    ]
  },

  {
    path: 'error',
    loadComponent: () =>
      import('./components/pages/error-page/error-page').then(
        (m) => m.ErrorPage
      ),
  },

  { path: '**', redirectTo: '/error', pathMatch: 'full' },
];
