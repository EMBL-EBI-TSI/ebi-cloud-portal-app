import { TestBed, inject } from '@angular/core/testing';

import { BreadcrumbService } from './breadcrumb.service';

describe('BreadcrumbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BreadcrumbService]
    });
  });

  it('should ...', inject([BreadcrumbService], (service: BreadcrumbService) => {
    expect(service).toBeTruthy();
  }));
});
