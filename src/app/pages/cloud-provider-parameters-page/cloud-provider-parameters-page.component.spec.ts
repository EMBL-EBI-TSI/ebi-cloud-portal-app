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
import { ConfigurationFilterPipe } from 'ng2-cloud-portal-presentation-lib';
import { CloudProviderParametersPageComponent } from './cloud-provider-parameters-page.component';

class MockConfig {
  
}
@Component({
  selector: 'cp-cloud-provider-parameters-component',
  template: ''
})
class MockCppComponent {

}


describe('CloudProviderParametersPageComponent', () => {
  let component: CloudProviderParametersPageComponent;
  let fixture: ComponentFixture<CloudProviderParametersPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        CommonModule, RouterModule, FormsModule,
        RouterTestingModule,
        MdChipsModule, MdIconModule, MdCoreModule,
        MdSelectModule, MdInputModule, MdDialogModule,
        MdTooltipModule 
      ],
      declarations: [ CloudProviderParametersPageComponent, MockCppComponent ],
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
    fixture = TestBed.createComponent(CloudProviderParametersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
