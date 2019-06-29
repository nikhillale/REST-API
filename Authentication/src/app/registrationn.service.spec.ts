import { TestBed } from '@angular/core/testing';

import { RegistrationnService } from './registrationn.service';

describe('RegistrationnService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegistrationnService = TestBed.get(RegistrationnService);
    expect(service).toBeTruthy();
  });
});
