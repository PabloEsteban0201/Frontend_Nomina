import { TestBed } from '@angular/core/testing';

import { AvailableEmployeesService } from './available-employees.service';

describe('AvailableEmployeesService', () => {
  let service: AvailableEmployeesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvailableEmployeesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
