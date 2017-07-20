import { TestBed, async, fakeAsync, tick} from '@angular/core/testing';
import { BaseRequestOptions, ConnectionBackend, Http, RequestOptions } from '@angular/http';
import { Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from "@angular/router";
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { MaterialModule, MdSelectModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { TokenService, CredentialService, AccountService,
    ConfigService, ErrorService, CloudProviderParametersService } from 'ng2-cloud-portal-service-lib';
import { BreadcrumbService } from './services/breadcrumb/breadcrumb.service';

class MockConfig {
  
}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        MaterialModule, MdSelectModule, RouterModule, CommonModule, FormsModule,
        RouterTestingModule ],
      declarations: [
        AppComponent
      ],
      providers: [ 
        TokenService, CredentialService, AccountService,
        ErrorService, CloudProviderParametersService,
        BreadcrumbService,
        { provide: ConfigService, useClass: MockConfig },
        { provide: ConnectionBackend, useClass: MockBackend },
        { provide: RequestOptions, useClass: BaseRequestOptions },
        Http 
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
