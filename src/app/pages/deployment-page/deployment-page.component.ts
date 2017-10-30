import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DeploymentComponent } from 'ng2-cloud-portal-presentation-lib';
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { SuggestActionDialog } from '../../dialogs/suggest-action-dialog/suggest-action-dialog.component';
import { ActivatedRoute } from '@angular/router';
import * as Convert from 'ansi-to-html';

@Component({
  selector: 'app-deployment-page',
  templateUrl: './deployment-page.component.html',
  styleUrls: ['./deployment-page.component.css']
})
export class DeploymentPageComponent implements OnInit {

  @ViewChild('stepper') stepper;

  convert = new Convert({
    newline: true, 
    stream: true });

  constructor(public breadcrumbService: BreadcrumbService,
    public dialog: MatDialog,
    private _route: ActivatedRoute,
    private cdRef:ChangeDetectorRef) {
  
  }

  ngOnInit() {
    let deploymentRef = this._route.snapshot.params['id'];
    this.breadcrumbService.breadcrumb.push( {label:'Deployments', route:'deployments'} );
    this.breadcrumbService.breadcrumb.push( {label:deploymentRef, route:'deployments/'+deploymentRef} );

  }

  ngOnDestroy() {
    this.breadcrumbService.breadcrumb = [];
  }

  ansiToHtml(ansi: string) {
    return this.convert.toHtml(ansi);
  }

  ngAfterViewChecked(){
    this.cdRef.detectChanges();
  }

  openConfirmDestroyDialog(deploymentDetail: DeploymentComponent) {
    const config = new MatDialogConfig();
    config.data = [
      'You are about to destroy the deployment \'' + deploymentDetail.deploymentInstance.reference +'\' (' + deploymentDetail.deploymentInstance.applicationName + ')',
      'DESTROY',
      'Please confirm'
    ];
    let dialogRef = this.dialog.open(SuggestActionDialog, config);
    dialogRef.afterClosed().subscribe(actionTaken => {
      if (actionTaken == 'DESTROY')
        deploymentDetail.destroyDeployment(deploymentDetail.deploymentInstance)
    });
    
  }

  openConfirmDeleteDialog(deploymentDetail: DeploymentComponent) {
    const config = new MatDialogConfig();
    config.data = [
      'You are about to permanently delete the deployment \'' + deploymentDetail.deploymentInstance.reference +'\' (' + deploymentDetail.deploymentInstance.applicationName + ')',
      'DELETE',
      'Please confirm'
    ];
    let dialogRef = this.dialog.open(SuggestActionDialog, config);
    dialogRef.afterClosed().subscribe(actionTaken => {
      if (actionTaken == 'DELETE')
        deploymentDetail.deleteDeployment(deploymentDetail.deploymentInstance)
    });
    
  }

  fromTimeStampToDateAndTime(timestamp: number) {
    var t = new Date( timestamp );
    var formatted = t.toISOString().replace("T"," ");

    return formatted;
  }
}
