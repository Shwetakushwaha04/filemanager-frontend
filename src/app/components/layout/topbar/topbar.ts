import { Component } from '@angular/core';

@Component({
  selector: 'app-topbar',
  imports: [],
  templateUrl: './topbar.html',
  styleUrl: './topbar.css'
})
export class Topbar {
  onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const file = input.files[0];
    console.log('Selected file:', file);
    // Next step: Send this to FastAPI backend
  }
}


}
