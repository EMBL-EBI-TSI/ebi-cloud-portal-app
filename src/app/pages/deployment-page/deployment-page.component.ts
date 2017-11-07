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
    let t = new Date( timestamp );
    let formatted = t.toISOString().replace("T"," ");
    let res = formatted.substring(0,formatted.indexOf("."));
    return res;
  }

  getTimeToDisplay(millisec: number) {
    let seconds: number = (millisec / 1000);
    let secondsChar;
    
    let minutes: number = Math.floor(seconds / 60);
    let minutesChar: string;

    let hours: number = 0;
    let hoursChar: string;

    let days: number = 0;
    let daysChar: string;

    if (minutes > 59) {
        hours = Math.floor(minutes / 60);
        if (hours>23) {
          days = Math.floor(hours / 24);
          daysChar = days.toFixed(0);
          hours = hours - (days * 24);
        }
        hoursChar = (hours >= 10) ? hours.toFixed(0) : "0" + hours.toFixed(0);
        minutes = minutes - (days * 24 * 60) - (hours * 60);
        minutesChar = (minutes >= 10) ? minutes.toFixed(0) : "0" + minutes.toFixed(0);
    }

    seconds = Math.floor(seconds % 60);
    secondsChar = (seconds >= 10) ? seconds.toFixed(0) : "0" + seconds.toFixed(0);
    
    if (days > 0) {
      return daysChar + " days " + hoursChar + "h " + minutesChar + "min " + secondsChar +"sec";
    } else if (hours > 0) {
      return hoursChar + "h " + minutesChar + "min " + secondsChar +"sec";
    } else if (hours > 0) {
      return minutesChar + "min " + secondsChar +"sec";
    } else {
      return secondsChar +"sec";
    }
  }

}
