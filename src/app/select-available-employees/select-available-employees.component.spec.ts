import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAvailableEmployeesComponent } from './select-available-employees.component';

describe('SelectAvailableEmployeesComponent', () => {
  let component: SelectAvailableEmployeesComponent;
  let fixture: ComponentFixture<SelectAvailableEmployeesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectAvailableEmployeesComponent]
    });
    fixture = TestBed.createComponent(SelectAvailableEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
