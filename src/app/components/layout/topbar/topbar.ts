import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FolderService } from '../../../services/folder.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './topbar.html',
  styleUrl: './topbar.css',
})
export class Topbar {
  showFolderModal = signal(false);
  newFolderName = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private folderService: FolderService
  ) {}

  toggleMode() {
    document.documentElement.classList.toggle('dark');
  }

  triggerUpload() {
    document.getElementById('fileUpload')?.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) console.log('File selected:', file.name);
  }

  // ✅ Called when clicking '+ New Folder'
  openNewFolderModal() {
    // figure out where we are (dashboard or my-storage)
    const isStorage = this.router.url.includes('my-storage');
    const location = isStorage ? 'my-storage' : 'dashboard';

    // check if we are inside a folder
    const folderMatch = this.router.url.match(/\/folder\/([^/]+)/);
    const parentId = folderMatch ? folderMatch[1] : 'root';

    // create the folder
    this.folderService.createFolder('Untitled folder', location as 'dashboard' | 'my-storage', parentId);

    console.log('📁 Folder created in:', location, '→ inside folder:', parentId);
  }

  // 🔐 For modal closing (optional if you're using a rename popup)
  closeNewFolderModal() {
    this.showFolderModal.set(false);
  }

  // 📝 Not needed now but kept if you use a modal to name folder
  createFolder() {
    if (!this.newFolderName.trim()) return;

    const event = new CustomEvent('folderCreated', {
      detail: this.newFolderName.trim(),
    });

    window.dispatchEvent(event);
    this.newFolderName = '';
    this.closeNewFolderModal();
  }
}
