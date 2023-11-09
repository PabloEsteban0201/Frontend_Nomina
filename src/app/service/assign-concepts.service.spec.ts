import { TestBed } from '@angular/core/testing';

import { AssignConceptsService } from './assign-concepts.service';

describe('AssignConceptsService', () => {
  let service: AssignConceptsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignConceptsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
