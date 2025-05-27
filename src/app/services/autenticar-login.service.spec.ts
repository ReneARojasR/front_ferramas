import { TestBed } from '@angular/core/testing';

import { AutenticarLoginService } from './autenticar-login.service';

describe('AutenticarLoginService', () => {
  let service: AutenticarLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutenticarLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
