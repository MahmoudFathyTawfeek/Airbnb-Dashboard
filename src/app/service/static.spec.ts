import { TestBed } from '@angular/core/testing';

import { Static } from './static';

describe('Static', () => {
  let service: Static;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Static);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
