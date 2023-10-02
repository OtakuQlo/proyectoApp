import { TestBed } from '@angular/core/testing';

import { CallnumberService } from './callnumber.service';

describe('CallnumberService', () => {
  let service: CallnumberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CallnumberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
