import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapstoneTitleComponent } from './capstone-title.component';

describe('CapstoneTitleComponent', () => {
  let component: CapstoneTitleComponent;
  let fixture: ComponentFixture<CapstoneTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapstoneTitleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapstoneTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
