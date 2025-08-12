import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-dashboard-page',
  imports: [CommonModule],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css'
})
export class DashboardPage {
  suggestedFolders = [
  { name: 'SEM 4 IPU' },
  { name: 'Photos Backup' },
  { name: 'Resume Folder' },
];

suggestedFiles = [
  {
    name: 'Aditya DSEU payment',
    reason: 'You modified • Jul 27, 2025',
    location: 'My Storage',
  },
  {
    name: 'Step by step seat allocation process',
    reason: 'You opened • 7:13 PM',
    location: 'Shared with me',
  },
];


}
