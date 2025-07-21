import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileGrid } from './file-grid';

describe('FileGrid', () => {
  let component: FileGrid;
  let fixture: ComponentFixture<FileGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileGrid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileGrid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
