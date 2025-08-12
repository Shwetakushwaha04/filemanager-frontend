import { Routes } from '@angular/router';
import { StatsPanel } from './components/dashboard/stats-panel/stats-panel';
import { FileGrid } from './components/dashboard/file-grid/file-grid';
import { FileCard } from './components/dashboard/file-card/file-card';
import { FolderSection } from './components/folder-section/folder-section';
import { DashboardPage } from './components/dashboard/dashboard-page/dashboard-page';
import { LoginRegister } from './login-register/login-register';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
  // { path: 'dashboard', component: FileGrid },
  { path: 'auth', component: LoginRegister },
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardPage, canActivate: [AuthGuard]},
  { path: 'dashboard/folder/:id', component: FolderSection, canActivate: [AuthGuard]},

  { path: 'my-storage', component: FolderSection, canActivate: [AuthGuard]},
  { path: 'my-storage/folder/:id', component: FolderSection, canActivate: [AuthGuard]},

  { path: 'recent', component: FileCard, canActivate: [AuthGuard]},
  { path: 'shared-link', component: FileCard, canActivate: [AuthGuard] },
  { path: 'favorite', component: FileCard, canActivate: [AuthGuard] },
  { path: 'trash', component: FileCard, canActivate: [AuthGuard] },

  {
    path: 'error',
    loadComponent: () =>
      import('./components/pages/error-page/error-page').then(
        (m) => m.ErrorPage
      ),
  },

  { path: '**', redirectTo: '/error', pathMatch: 'full' },
];
