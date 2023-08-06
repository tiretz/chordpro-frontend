import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InlinesSelectorComponent } from './inlines-selector.component';

describe('InlinesSelectorComponent', () => {
  let component: InlinesSelectorComponent;
  let fixture: ComponentFixture<InlinesSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InlinesSelectorComponent]
    });
    fixture = TestBed.createComponent(InlinesSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
