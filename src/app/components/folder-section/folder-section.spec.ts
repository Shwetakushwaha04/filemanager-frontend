import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderSection } from './folder-section';

describe('FolderSection', () => {
  let component: FolderSection;
  let fixture: ComponentFixture<FolderSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FolderSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FolderSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
