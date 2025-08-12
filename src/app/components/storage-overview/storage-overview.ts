import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';

@Component({
  selector: 'app-storage-overview',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './storage-overview.html',
})
export class StorageOverview {
  @Input() folderId: string |null = null;
  pieData = [
    { name: 'Videos', value: 4.5 },
    { name: 'Audio', value: 2.5 },
    { name: 'Photos', value: 1.5 },
    { name: 'Documents', value: 1.5 },
  ];

  total = this.pieData.reduce((acc, cur) => acc + cur.value, 0);

  colorScheme = {
    domain: ['#f97316', '#22c55e', '#3b82f6', '#eab308']
  };

  ngOnChanges() {
    console.log('📂 Folder ID received in storage-overview:', this.folderId);
  }
}
