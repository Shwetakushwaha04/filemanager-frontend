export interface FileMeta {
  id: string;
  name: string;
  size: number;
  type: string;
  mime: string;
  uuid: string;
  extension: string;
  parentId: string;
  location: 'dashboard' | 'my-storage';
  createdAt: number;
}
