import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';
import { ErrorPageComponent } from './error-page.component';

@Component({
  selector: 'cp-error-component',
  template: '<ng-content></ng-content>'
})
class MockErrorComponent {
  // public getErrorMessage() {
  //   return "Some error cause";
  // }
}

describe('ErrorComponentComponent', () => {
  let component: ErrorPageComponent;
  let fixture: ComponentFixture<ErrorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorPageComponent, MockErrorComponent ],
      providers: [
        BreadcrumbService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
