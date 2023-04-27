import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluateTitleComponent } from './evaluate-title.component';

describe('EvaluateTitleComponent', () => {
  let component: EvaluateTitleComponent;
  let fixture: ComponentFixture<EvaluateTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluateTitleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluateTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
