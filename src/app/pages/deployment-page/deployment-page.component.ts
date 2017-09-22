import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { DeploymentComponent } from 'ng2-cloud-portal-presentation-lib';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SuggestActionDialog } from '../../dialogs/suggest-action-dialog/suggest-action-dialog.component';
import { ActivatedRoute } from '@angular/router';
import * as Convert from 'ansi-to-html';

@Component({
  selector: 'app-deployment-page',
  templateUrl: './deployment-page.component.html',
  styleUrls: ['./deployment-page.component.css']
})
export class DeploymentPageComponent implements OnInit {

  convert = new Convert({
    newline: true, 
    stream: true });

  constructor(public breadcrumbService: BreadcrumbService,
    public dialog: MdDialog,
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
    const config = new MdDialogConfig();
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

}
