import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudProviderParametersPageComponent } from './cloud-provider-parameters-page.component';

describe('CloudProviderParametersPageComponent', () => {
  let component: CloudProviderParametersPageComponent;
  let fixture: ComponentFixture<CloudProviderParametersPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloudProviderParametersPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloudProviderParametersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
