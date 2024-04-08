import { TestBed } from '@angular/core/testing';

import { CoffeeCupsServiceService } from './coffee-cups-service.service';

describe('CoffeeCupsServiceService', () => {
  let service: CoffeeCupsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoffeeCupsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
