import { TestBed, inject } from '@angular/core/testing';

import { PreventUnsavedChangesGuardService } from './prevent-unsaved-changes-guard.service';

describe('PreventUnsavedChangesGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreventUnsavedChangesGuardService]
    });
  });

  it('should be created', inject([PreventUnsavedChangesGuardService], (service: PreventUnsavedChangesGuardService) => {
    expect(service).toBeTruthy();
  }));
});
