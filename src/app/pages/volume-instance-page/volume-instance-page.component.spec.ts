import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeInstancePageComponent } from './volume-instance-page.component';

describe('VolumeInstancePageComponent', () => {
  let component: VolumeInstancePageComponent;
  let fixture: ComponentFixture<VolumeInstancePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolumeInstancePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolumeInstancePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
