import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stats-panel',
  imports: [CommonModule],
  templateUrl: './stats-panel.html',
  styleUrl: './stats-panel.css'
})
export class StatsPanel {
  stats = [
    {title: 'Files', count :120},
    {title: 'Storage used', count :"8 GB"},
    {title: 'Total folders', count :15},
    {title: 'Shared Links', count :5},
  ];
}
