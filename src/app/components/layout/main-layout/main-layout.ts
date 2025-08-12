import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

import { Topbar } from '../topbar/topbar';
import { Sidebar } from '../sidebar/sidebar';
import { StorageOverview } from '../../storage-overview/storage-overview';
import { FolderSection } from '../../folder-section/folder-section';
import { FileGrid } from '../../dashboard/file-grid/file-grid';
import { NotesPanel } from '../../side-panel/notes-panel/notes-panel';
import { CalendarPanel } from '../../side-panel/calendar-panel/calendar-panel';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    Topbar,
    Sidebar,
    StorageOverview,
    FolderSection,
    FileGrid,
    NotesPanel,
    CalendarPanel
  ],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.css']
})
export class MainLayoutComponent implements OnInit {
  selectedFolderId: string | null = null;
  showChartPanel = false;
  isWidgetOpen = false;
  activeWidget: 'notes' | 'calendar' | null = null;

  constructor(private themeService: ThemeService, private router: Router) {}

  ngOnInit(): void {
    this.themeService.loadTheme();

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        const url = event.urlAfterRedirects;
        if (!url.includes('/folder/') && !url.includes('my-storage')) {
          this.selectedFolderId = null;
          this.showChartPanel = false;
        }
      });
  }

  // Widget controls
  toggleNotes() {
    this.activeWidget = this.activeWidget === 'notes' ? null : 'notes';
    this.isWidgetOpen = !!this.activeWidget;
  }
  toggleCalendar() {
    this.activeWidget = this.activeWidget === 'calendar' ? null : 'calendar';
    this.isWidgetOpen = !!this.activeWidget;
  }
  closeWidget() {
    this.isWidgetOpen = false;
    this.activeWidget = null;
  }
}
