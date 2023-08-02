import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverrideDialogComponent } from './override-dialog.component';

describe('OverrideDialogComponent', () => {
  let component: OverrideDialogComponent;
  let fixture: ComponentFixture<OverrideDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OverrideDialogComponent]
    });
    fixture = TestBed.createComponent(OverrideDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
