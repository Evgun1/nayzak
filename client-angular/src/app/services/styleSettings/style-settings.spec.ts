import { TestBed } from '@angular/core/testing';

import { StyleSettings } from './style-settings';

describe('StyleSettings', () => {
  let service: StyleSettings;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StyleSettings);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
