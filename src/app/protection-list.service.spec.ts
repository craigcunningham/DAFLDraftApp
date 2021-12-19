import { TestBed } from '@angular/core/testing';

import { ProtectionListService } from './protection-list.service';

describe('ProtectionListService', () => {
  let service: ProtectionListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProtectionListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
