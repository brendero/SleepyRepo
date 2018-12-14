import { TestBed } from '@angular/core/testing';

import { SleeptrackingService } from './sleeptracking.service';

describe('SleeptrackingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SleeptrackingService = TestBed.get(SleeptrackingService);
    expect(service).toBeTruthy();
  });
});
