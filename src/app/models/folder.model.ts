export interface Folder {
  id: string;
  name: string;
  createdAt: Date;
  parentId?: string;
  isEditing?: boolean;
  location: 'dashboard' |'my-storage';
}
