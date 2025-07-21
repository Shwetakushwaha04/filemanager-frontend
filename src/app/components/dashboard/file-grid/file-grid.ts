import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileCard } from '../file-card/file-card';

@Component({
  selector: 'app-file-grid',
  imports: [CommonModule, FileCard],
  templateUrl: './file-grid.html',
  styleUrls: ['./file-grid.css'],
})
export class FileGrid {
  viewMode = signal<'grid' | 'list'>('grid');

  files = [
    { name: 'Project Plans.doc', type: 'Doc', size: '200 MB' },
    { name: 'Keywords.pdf', type: 'Pdf', size: '40 MB' },
    { name: 'Prototype.doc', type: 'Doc', size: '140 MB' },
  ];

  toggleView(){
    this.viewMode.update(mode =>(mode == 'grid' ? 'list' : 'grid'));
  }
}
