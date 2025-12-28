import { TestBed } from '@angular/core/testing';

import { Emom } from './emom';

describe('Emom', () => {
  let service: Emom;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Emom);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
