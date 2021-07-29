import { TestBed } from '@angular/core/testing';

import { FunctionCallService } from './function-call.service';

describe('FunctionCallService', () => {
  let service: FunctionCallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FunctionCallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
