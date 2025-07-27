import { Routes } from '@angular/router';
import { StatsPanel } from './components/dashboard/stats-panel/stats-panel';
import { FileGrid } from './components/dashboard/file-grid/file-grid';
import { FileCard } from './components/dashboard/file-card/file-card';
import { ErrorPage } from './components/pages/error-page/error-page';
import { FolderSection } from './components/folder-section/folder-section';
import { Component } from '@angular/core';

export const routes: Routes = [
  // { path: 'dashboard', component: FileGrid },

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: FolderSection },
  { path: 'dashboard/folder/:id', component: FolderSection },

  { path: 'my-storage', component: FolderSection },
  { path: 'my-storage/folder/:id', component: FolderSection },

  { path: 'recent', component: FileCard },
  { path: 'shared-link', component: FileCard },
  { path: 'favorite', component: FileCard },
  { path: 'trash', component: FileCard },

  {
    path: 'error',
    loadComponent: () =>
      import('./components/pages/error-page/error-page').then(
        (m) => m.ErrorPage
      ),
  },

  { path: '**', redirectTo: '/error', pathMatch: 'full' },
];
