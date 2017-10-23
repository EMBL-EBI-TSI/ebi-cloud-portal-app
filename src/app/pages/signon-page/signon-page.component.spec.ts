import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignonPageComponent } from './signon-page.component';

describe('SignonPageComponent', () => {
  let component: SignonPageComponent;
  let fixture: ComponentFixture<SignonPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignonPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignonPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
