import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ApplicationPageComponent } from './application-page.component';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';
import { CommonModule } from '@angular/common';
import { MdChipsModule, MdIconModule, MdSelectModule,
    MdInputModule, MdCoreModule } from '@angular/material';

describe('ApplicationPageComponent', () => {
  let component: ApplicationPageComponent;
  let fixture: ComponentFixture<ApplicationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CommonModule, MdChipsModule, MdIconModule,
          MdSelectModule, MdInputModule, MdCoreModule, FormsModule ],
      declarations: [ ApplicationPageComponent ],
      providers: [ BreadcrumbService ]
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
