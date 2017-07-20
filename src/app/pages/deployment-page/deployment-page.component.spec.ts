import { TestBed, async, fakeAsync, tick, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';
import { BaseRequestOptions, ConnectionBackend, Http, RequestOptions } from '@angular/http';
import { Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';
import { CommonModule } from '@angular/common';
import { 
  MdChipsModule, MdIconModule, MdSelectModule,
  MdInputModule, MdCoreModule, MdTooltipModule,
  MdDialogModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { 
  TokenService, CredentialService, AccountService,
  ConfigService, ErrorService, CloudProviderParametersService } from 'ng2-cloud-portal-service-lib';
import { DeploymentPageComponent } from './deployment-page.component';


class MockConfig {
  
}
@Component({
  selector: 'cp-deployment-component',
  template: '<ng-content></ng-content>'
})
class MockDeploymentComponent {

}


describe('DeploymentPageComponent', () => {
  let component: DeploymentPageComponent;
  let fixture: ComponentFixture<DeploymentPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        CommonModule, RouterModule, FormsModule,
        RouterTestingModule,
        MdChipsModule, MdIconModule, MdCoreModule,
        MdSelectModule, MdInputModule, MdDialogModule,
        MdTooltipModule 
      ],
      declarations: [ DeploymentPageComponent, MockDeploymentComponent ],
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
    fixture = TestBed.createComponent(DeploymentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
