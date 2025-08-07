import { TestBed } from '@angular/core/testing';

import { PublicContentService } from './public-content.service';

describe('PublicContentService', () => {
  let service: PublicContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
