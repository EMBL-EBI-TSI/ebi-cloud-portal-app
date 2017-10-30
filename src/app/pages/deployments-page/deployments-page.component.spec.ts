import { TestBed, async, fakeAsync, tick, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';
import { BaseRequestOptions, ConnectionBackend, Http, RequestOptions } from '@angular/http';
import { Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatCoreModule, MatCheckboxModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { 
  TokenService, CredentialService, AccountService,
  ConfigService, ErrorService, CloudProviderParametersService } from 'ng2-cloud-portal-service-lib';
import { DeploymentsPageComponent } from './deployments-page.component';
import { DeploymentStatusFilterPipe } from 'ng2-cloud-portal-presentation-lib';


class MockConfig {
  
}
@Component({
  selector: 'cp-deployments-component',
  template: '<ng-content></ng-content>'
})
class MockDeploymentsComponent {

}

describe('DeploymentsPageComponent', () => {
  let component: DeploymentsPageComponent;
  let fixture: ComponentFixture<DeploymentsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        CommonModule, RouterModule,
        RouterTestingModule,
        MatIconModule, MatCoreModule, MatCheckboxModule
      ],
      declarations: [ DeploymentsPageComponent, MockDeploymentsComponent, DeploymentStatusFilterPipe ],
      providers: [ 
        BreadcrumbService,
        { provide: ConfigService, useClass: MockConfig },
        { provide: ConnectionBackend, useClass: MockBackend },
        { provide: RequestOptions, useClass: BaseRequestOptions },
        Http 
      ]
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
