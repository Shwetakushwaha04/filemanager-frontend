import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Folder } from '../models/folder.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({ providedIn: 'root' })
export class FolderService {
  private folders = new BehaviorSubject<Folder[]>([
    { id: uuidv4(), name: 'Documents', createdAt: new Date(), location: 'dashboard', isEditing: false },
    { id: uuidv4(), name: 'Photos', createdAt: new Date(), location: 'dashboard', isEditing: false },
    { id: uuidv4(), name: 'Videos', createdAt: new Date(), location: 'dashboard', isEditing: false }
  ]);

  folders$ = this.folders.asObservable();

  createFolder(name: string = 'Untitled folder', location: 'dashboard' | 'my-storage', parentId?: string) {
    const newFolder: Folder = {
      id: uuidv4(),
      name,
      createdAt: new Date(),
      parentId,
      location,
      isEditing: true,
    };
    this.folders.next([...this.folders.value, newFolder]);
  }

  updateFolder(updated: Folder) {
    const updatedList = this.folders.value.map(f =>
      f.id === updated.id ? { ...updated, isEditing: false } : f
    );
    this.folders.next(updatedList);
  }

  deleteFolder(id: string) {
    const filtered = this.folders.value.filter(f => f.id !== id);
    this.folders.next(filtered);
  }
}
