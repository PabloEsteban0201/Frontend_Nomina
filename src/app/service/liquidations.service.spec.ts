import { TestBed } from '@angular/core/testing';

import { LiquidationsService } from './liquidations.service';

describe('LiquidationsService', () => {
  let service: LiquidationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiquidationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
