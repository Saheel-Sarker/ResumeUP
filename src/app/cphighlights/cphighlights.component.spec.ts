import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CPHighlightsComponent } from './cphighlights.component';

describe('CPHighlightsComponent', () => {
  let component: CPHighlightsComponent;
  let fixture: ComponentFixture<CPHighlightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CPHighlightsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CPHighlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
