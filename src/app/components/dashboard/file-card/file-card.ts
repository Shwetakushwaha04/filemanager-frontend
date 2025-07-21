import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-file-card',
  imports: [],
  templateUrl: './file-card.html',
  styleUrl: './file-card.css'
})
export class FileCard {
  @Input() file: any;
}
