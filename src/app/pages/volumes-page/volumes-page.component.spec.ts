import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumesPageComponent } from './volumes-page.component';

describe('VolumesPageComponent', () => {
  let component: VolumesPageComponent;
  let fixture: ComponentFixture<VolumesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolumesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolumesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
