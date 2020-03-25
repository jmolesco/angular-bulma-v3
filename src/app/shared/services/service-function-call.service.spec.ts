import { TestBed } from '@angular/core/testing';

import { ServiceFunctionCallService } from './service-function-call.service';

describe('ServiceFunctionCallService', () => {
  let service: ServiceFunctionCallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceFunctionCallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
