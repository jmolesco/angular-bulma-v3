import { TestBed } from '@angular/core/testing';

import { ServiceRequestCallService } from './service-request-call.service';

describe('ServiceRequestCallService', () => {
  let service: ServiceRequestCallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceRequestCallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
