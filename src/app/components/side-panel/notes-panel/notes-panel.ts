import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notes-panel',
  imports: [FormsModule, CommonModule],
  templateUrl: './notes-panel.html',
  styleUrl: './notes-panel.css'
})
export class NotesPanel {
  notes: string[] = [];
  newNote: string = '';

  addNote(){
    if(this.newNote.trim()){
      this.notes.push(this.newNote.trim());
    this.newNote='';
    }
  }
}
