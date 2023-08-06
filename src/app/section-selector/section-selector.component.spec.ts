import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionSelectorComponent } from './section-selector.component';

describe('SectionSelectorComponent', () => {
  let component: SectionSelectorComponent;
  let fixture: ComponentFixture<SectionSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SectionSelectorComponent]
    });
    fixture = TestBed.createComponent(SectionSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
