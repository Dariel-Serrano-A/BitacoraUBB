import { TestBed } from '@angular/core/testing';

import { BitacorasService } from './bitacoras.service';

describe('BitacorasService', () => {
  let service: BitacorasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BitacorasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
