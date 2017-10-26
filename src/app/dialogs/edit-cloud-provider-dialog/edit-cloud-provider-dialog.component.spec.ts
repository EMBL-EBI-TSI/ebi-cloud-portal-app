import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditCloudProviderDialog } from './edit-cloud-provider-dialog.component';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MaterialModule, MatDialogModule, MatDialogRef } from '@angular/material';
import { CommonModule } from '@angular/common';

class MdDialogRefMock {
}

class FormControlMock {
}

class FormGroupMock {
}

describe('EditCloudProviderDialog', () => {
  let component: EditCloudProviderDialog;
  let fixture: ComponentFixture<EditCloudProviderDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CommonModule,  FormsModule, ReactiveFormsModule, MaterialModule, MatDialogModule ],
      declarations: [ EditCloudProviderDialog ],
      providers: [ 
        { provide: MatDialogRef, useClass: MdDialogRefMock },
        { provide: FormControl, useClass: FormControlMock },
        { provide: FormGroup, useClass: FormGroupMock },
        FormBuilder
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCloudProviderDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
