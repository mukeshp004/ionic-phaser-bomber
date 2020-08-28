import { TestBed } from '@angular/core/testing';

import { StartSceneService } from './start-scene.service';

describe('StartSceneService', () => {
  let service: StartSceneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StartSceneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
