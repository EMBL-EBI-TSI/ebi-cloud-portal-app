import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeSetupPageComponent } from './volume-setup-page.component';

describe('VolumeSetupPageComponent', () => {
  let component: VolumeSetupPageComponent;
  let fixture: ComponentFixture<VolumeSetupPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolumeSetupPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolumeSetupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
