import { TestBed } from '@angular/core/testing';

import { StatSocketService } from './stat-socket.service';

describe('StatSocketService', () => {
  let service: StatSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
