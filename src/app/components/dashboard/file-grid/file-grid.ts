import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileCard } from '../file-card/file-card';
import { StorageOverview } from '../../storage-overview/storage-overview';
import { FolderSection } from '../../folder-section/folder-section';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-file-grid',
  standalone: true,
  imports: [CommonModule, FileCard, FolderSection],
  templateUrl: './file-grid.html',
  styleUrls: ['./file-grid.css'],
})
export class FileGrid {
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const folderId = this.route.snapshot.paramMap.get('folderId');
  }
  viewMode = signal<'grid' | 'list'>('grid');

  files = [
    { name: 'Project Plans.doc', type: 'Doc', size: '200 MB' },
    { name: 'Keywords.pdf', type: 'Pdf', size: '40 MB' },
    { name: 'Prototype.doc', type: 'Doc', size: '140 MB' },
  ];

  toggleView() {
    this.viewMode.update((mode) => (mode == 'grid' ? 'list' : 'grid'));
  }
}
