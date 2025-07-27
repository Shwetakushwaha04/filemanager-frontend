import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // ✅ Import this

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule], // ✅ Add RouterModule here
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  usedStorage = 4.2;
  totalStorage = 10;

  get usagePercent(): number {
    return (this.usedStorage / this.totalStorage) * 100;
  }
}
