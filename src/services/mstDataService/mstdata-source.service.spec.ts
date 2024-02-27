import { TestBed } from '@angular/core/testing';

import { MSTDataSourceService } from './mstdata-source.service';

describe('MSTDataSourceService', () => {
  let service: MSTDataSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MSTDataSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
