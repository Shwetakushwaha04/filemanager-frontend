import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageOverview } from './storage-overview';

describe('StorageOverview', () => {
  let component: StorageOverview;
  let fixture: ComponentFixture<StorageOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorageOverview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StorageOverview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
