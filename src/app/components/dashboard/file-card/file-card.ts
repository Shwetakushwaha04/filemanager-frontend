import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-file-card',
  imports: [CommonModule],
  templateUrl: './file-card.html',
  styleUrl: './file-card.css'
})
export class FileCard {
  @Input() file: any;
}
