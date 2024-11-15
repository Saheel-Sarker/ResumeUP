import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JPHighlightsComponent } from './jphighlights.component';

describe('JPHighlightsComponent', () => {
  let component: JPHighlightsComponent;
  let fixture: ComponentFixture<JPHighlightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JPHighlightsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JPHighlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
