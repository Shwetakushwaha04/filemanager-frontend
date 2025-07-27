import { Component, OnInit, OnDestroy } from '@angular/core';
import { FolderService } from '../../services/folder.service';
import { Folder } from '../../models/folder.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-folder-section',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './folder-section.html',
  styleUrls: ['./folder-section.css'],
})
export class FolderSection implements OnInit, OnDestroy {
  folders: Folder[] = [];
  folderName = '';
  showCreateFolder = false;
  menuOpenForId: string | null = null;

  parentId: string = 'root';
  location: 'dashboard' | 'my-storage' = 'dashboard';
  folderSubscription: any;
  outsideClickListener: any;

  constructor(
    public folderService: FolderService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.parentId = params.get('id') || 'root';
      this.location = this.getLocationFromUrl(this.router.url) ;

      if (this.folderSubscription) {
        this.folderSubscription.unsubscribe();
      }

      this.folderSubscription = this.folderService.folders$.subscribe((folders) => {
        this.folders = folders.filter((f) =>
          f.parentId === this.parentId && f.location === this.location
        );
      });
    });

    this.outsideClickListener = () => this.closeMenu();
    window.addEventListener('click', this.outsideClickListener);
  }

  getLocationFromUrl(url: string): 'dashboard' | 'my-storage' {
    return url.includes('my-storage') ? 'my-storage' : 'dashboard';
  }

  ngOnDestroy() {
    if (this.folderSubscription) {
      this.folderSubscription.unsubscribe();
    }
    window.removeEventListener('click', this.outsideClickListener);
  }

  goToFolder(folderId: string) {
    this.router.navigate([`/${this.location}/folder`, folderId]);
  }

  createFolder() {
    this.folderService.createFolder('Untitled folder', this.location, this.parentId);
  }

  toggleMenu(folderId: string) {
    this.menuOpenForId = this.menuOpenForId === folderId ? null : folderId;
  }

  closeMenu() {
    this.menuOpenForId = null;
  }

  startRename(folder: Folder) {
    folder.isEditing = true;
  }

  finishRename(folder: Folder) {
    folder.isEditing = false;
    if (!folder.name.trim()) {
      this.folderService.deleteFolder(folder.id);
    } else {
      this.folderService.updateFolder(folder);
    }
  }

  getCurrentRouteId(): string {
    return this.route.snapshot.routeConfig?.path || 'root';
  }
}
