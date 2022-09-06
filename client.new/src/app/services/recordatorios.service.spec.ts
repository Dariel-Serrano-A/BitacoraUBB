/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RecordatoriosService } from './recordatorios.service';

describe('Service: Recordatorios', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecordatoriosService]
    });
  });

  it('should ...', inject([RecordatoriosService], (service: RecordatoriosService) => {
    expect(service).toBeTruthy();
  }));
});
