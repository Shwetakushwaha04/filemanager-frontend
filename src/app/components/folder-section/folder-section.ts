import { Component, OnInit, OnDestroy, Output, EventEmitter
} from '@angular/core';
import { FolderService } from '../../services/folder.service';
import { Folder } from '../../models/folder.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-folder-section',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './folder-section.html',
  styleUrls: ['./folder-section.css'],
})
export class FolderSection implements OnInit, OnDestroy {
  isDragActive = false;
  uploads: { name: string; progress: number }[] = [];
  folders: Folder[] = [];
  folderName = '';
  showCreateFolder = false;
  menuOpenForId: string | null = null;

  parentId: string = 'root';
  location: 'dashboard' | 'my-storage' = 'dashboard';
  folderSubscription: any;
  outsideClickListener: any;
  clickTimeout: any;
  insideFolder: boolean = false;

  constructor(
    private http: HttpClient,
    public folderService: FolderService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  @Output() folderClicked = new EventEmitter<string>();
  handleFolderClick(folderId: string) {
    this.folderClicked.emit(folderId);
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.parentId = params.get('id') || 'root';
      this.location = this.getLocationFromUrl(this.router.url);

      this.insideFolder = this.parentId !== 'root';

      if (this.folderSubscription) {
        this.folderSubscription.unsubscribe();
      }

      this.folderSubscription = this.folderService.folders$.subscribe(
        (folders) => {
          this.folders = folders.filter(
            (f) => f.parentId === this.parentId && f.location === this.location
          );
        }
      );
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

  onSingleClick(folderId: string) {
    clearTimeout(this.clickTimeout);
    this.clickTimeout = setTimeout(() => {
      this.handleFolderClick(folderId); // Show chart
    }, 300); // 200ms: delay to distinguish from double click
  }

  onDoubleClick(folderId: string) {
    clearTimeout(this.clickTimeout);
    this.goToFolder(folderId);
  }
  goToFolder(folderId: string) {
    this.router.navigate([`/${this.location}/folder`, folderId]);
  }

  createFolder() {
    this.folderService.createFolder(
      'Untitled folder',
      this.location,
      this.parentId
    );
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

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragActive = true;
  }

  onDragLeave(event: DragEvent) {
    this.isDragActive = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragActive = false;
    if (event.dataTransfer?.files) {
      this.handleFiles(event.dataTransfer.files);
    }
  }

  onFileSelect(event: any) {
    if (event.target.files) {
      this.handleFiles(event.target.files);
    }
  }

  private handleFiles(files: FileList) {
    Array.from(files).forEach((file) => {
      this.uploadFile(file);
    });
  }

  private uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    this.uploads.push({ name: file.name, progress: 0 });

    this.http
      .post('/api/upload', formData, {
        reportProgress: true,
        observe: 'events',
      })
      .subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          const percent = Math.round((event.loaded / event.total) * 100);
          const upload = this.uploads.find((u) => u.name === file.name);
          if (upload) upload.progress = percent;
        }
      });
  }
}
