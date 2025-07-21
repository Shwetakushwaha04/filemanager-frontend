import { Routes } from '@angular/router';
import { StatsPanel } from './components/dashboard/stats-panel/stats-panel';
import { FileGrid } from './components/dashboard/file-grid/file-grid';
import { FileCard } from './components/dashboard/file-card/file-card';

export const routes: Routes = [
  { path: '', component: StatsPanel },
  { path: 'my-storage', component: FileGrid },
  { path: 'recent', component: FileCard },
  { path: 'shared-link', component: FileGrid },
  { path: 'favorite', component: FileCard },
  { path: 'trash', component: StatsPanel },
];
