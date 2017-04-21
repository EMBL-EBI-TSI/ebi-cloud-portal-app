import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeploymentsPageComponent } from './deployments-page.component';

describe('DeploymentsPageComponent', () => {
  let component: DeploymentsPageComponent;
  let fixture: ComponentFixture<DeploymentsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeploymentsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeploymentsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
