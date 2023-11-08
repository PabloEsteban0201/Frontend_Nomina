import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignConceptsComponent } from './assign-concepts.component';

describe('AssignConceptsComponent', () => {
  let component: AssignConceptsComponent;
  let fixture: ComponentFixture<AssignConceptsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignConceptsComponent]
    });
    fixture = TestBed.createComponent(AssignConceptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
