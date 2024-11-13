import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NlpGeneratorComponent } from './nlp-generator.component';

describe('NlpGeneratorComponent', () => {
  let component: NlpGeneratorComponent;
  let fixture: ComponentFixture<NlpGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NlpGeneratorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NlpGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
