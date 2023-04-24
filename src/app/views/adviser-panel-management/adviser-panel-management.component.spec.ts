import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdviserPanelManagementComponent } from './adviser-panel-management.component';

describe('AdviserPanelManagementComponent', () => {
  let component: AdviserPanelManagementComponent;
  let fixture: ComponentFixture<AdviserPanelManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdviserPanelManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdviserPanelManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
