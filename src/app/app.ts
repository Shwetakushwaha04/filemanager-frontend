import { Component, OnInit } from '@angular/core';
import { RouterOutlet, NavigationEnd, Router } from '@angular/router';
import { Topbar } from "./components/layout/topbar/topbar";
import { Sidebar } from "./components/layout/sidebar/sidebar";
import { CommonModule } from '@angular/common';
import { ThemeService } from './services/theme.service';
import { filter } from 'rxjs';
import { StorageOverview } from "./components/storage-overview/storage-overview";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, Topbar, Sidebar, StorageOverview],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  showStorageChart = false;

  constructor(private themeService: ThemeService, private router: Router) {}

  ngOnInit(): void {
    this.themeService.loadTheme();

    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event) => {
      const url = event.urlAfterRedirects;
      this.showStorageChart = url === '/my-storage' || url.startsWith('/my-storage/folder');
    });
  }
}
