import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChordSelectorComponent } from './chord-selector.component';

describe('ChordSelectorComponent', () => {
  let component: ChordSelectorComponent;
  let fixture: ComponentFixture<ChordSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChordSelectorComponent]
    });
    fixture = TestBed.createComponent(ChordSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
