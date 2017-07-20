import { TestBed, async, fakeAsync, tick, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';
import { BaseRequestOptions, ConnectionBackend, Http, RequestOptions } from '@angular/http';
import { Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { ApplicationPageComponent } from './application-page.component';
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

class MockConfig {
  
}
@Component({
  selector: 'cp-application-component',
  template: ''
})
class MockApplicationComponent {

}
    
describe('ApplicationPageComponent', () => {
  let component: ApplicationPageComponent;
  let fixture: ComponentFixture<ApplicationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        CommonModule, RouterModule, FormsModule,
        RouterTestingModule,
        MdChipsModule, MdIconModule, MdCoreModule,
        MdSelectModule, MdInputModule, MdDialogModule,
        MdTooltipModule 
      ],
      declarations: [ ApplicationPageComponent, MockApplicationComponent, ConfigurationFilterPipe ],
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
    fixture = TestBed.createComponent(ApplicationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
