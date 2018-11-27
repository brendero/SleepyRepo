import { TestBed } from '@angular/core/testing';

import { PhotofeedService } from './photofeed.service';

describe('PhotofeedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PhotofeedService = TestBed.get(PhotofeedService);
    expect(service).toBeTruthy();
  });
});
