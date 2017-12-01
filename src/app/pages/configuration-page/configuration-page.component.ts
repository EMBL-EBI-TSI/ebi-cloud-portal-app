import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';
import { ConfigurationComponent, DeploymentInstance } from 'ng2-cloud-portal-presentation-lib';
import { ShareDialog } from '../../dialogs/share-dialog/share-dialog.component';
import { EditConfigurationDialog } from '../../dialogs/edit-configuration-dialog/edit-configuration-dialog.component';
import { SuggestActionDialog } from '../../dialogs/suggest-action-dialog/suggest-action-dialog.component';
import { ShowTimelineDialog } from '../../dialogs/show-timeline-dialog/show-timeline-dialog.component';

@Component({
  selector: 'app-configuration-page',
  templateUrl: './configuration-page.component.html',
  styleUrls: ['./configuration-page.component.css']
})
export class ConfigurationPageComponent implements OnInit {

  constructor(public breadcrumbService: BreadcrumbService,
    public dialog: MatDialog, private _route: ActivatedRoute) {

  }

  ngOnInit() {
    let configurationName = this._route.snapshot.params['id'];
    this.breadcrumbService.breadcrumb.push({ label: 'Profile', route: 'profile' });
    this.breadcrumbService.breadcrumb.push({ label: configurationName, route: 'configuration/' + configurationName });
  }

  generateStats(configurationDetail: ConfigurationComponent) {
    
    let consumptions = new Map();
    let dates = [];
    let data = [];

    // First, we sort deployments by deployment date
    let sortedDeploymentInstances = [...configurationDetail.deploymentInstances].sort(
      function(a,b) {
        let aDate = new Date(a.deployedTime);
        let bDate = new Date(b.deployedTime);
        if (aDate < bDate) {
          return -1;
        } else {
          return 1;
        }
      });
    // Second, we iterate through all the deployments accounting for the used and released consumptions
    // in the dates where they were allocated and released (they might be the same and they will cancel out)
    sortedDeploymentInstances.forEach(
      deploymentInstance => {
        if (deploymentInstance.deployedTime) {
          // account for resource consumption
          let consumptionValue = ((deploymentInstance.totalVcpus + deploymentInstance.totalRamGb/2)*0.25) * 24; // consumption per whole 24h period
          let theDeploymentDate = new Date(deploymentInstance.deployedTime);
          // theDeploymentDate.setHours(0);
          // theDeploymentDate.setMinutes(0);
          // theDeploymentDate.setSeconds(0);
          // theDeploymentDate.setMilliseconds(0);
          if (consumptions.has(theDeploymentDate)) {
            let currentValue = consumptions.get(theDeploymentDate);
            consumptionValue = consumptionValue + currentValue;
          }
          consumptions.set(theDeploymentDate, consumptionValue);

          // account for resource release, if needed
          let releasedValue = - ((deploymentInstance.totalVcpus + deploymentInstance.totalRamGb/2)*0.25) * 24; // consumption per whole 24h period
          if (deploymentInstance.destroyedTime) {
            let theReleaseDate = new Date(deploymentInstance.destroyedTime);
            // theReleaseDate.setHours(0);
            // theReleaseDate.setMinutes(0);
            // theReleaseDate.setSeconds(0);
            // theReleaseDate.setMilliseconds(0);
            if (consumptions.has(theReleaseDate)) {
              let currentValue = consumptions.get(theReleaseDate);
              releasedValue = currentValue + releasedValue;
            }
            consumptions.set(theReleaseDate, releasedValue);
          }
        }
      }
    );
    // Third, we need to sort the map by dates (keys)
    consumptions = new Map(Array.from(consumptions.entries()).sort(function(a,b) {
      let aDate = new Date(a[0]);
      let bDate = new Date(b[0]);
      if (aDate < bDate) {
        return -1;
      } else {
        return 1;
      }
    }));
    
    // Finally, we iterate through the consumption records and create a list of dates and a list of accummulated consumptions
    let lastConsumptionRate = 0; 
    let lastConsumption = 0;
    let lastDate = new Date();
    consumptions.forEach(function(value, key, map) {
      // register the new date date
      let newDate = new Date(key.valueOf());
      dates.push(newDate);

      // calculate number of days passed since the last recorded date
      let numberOfDays = newDate.getDate() - lastDate.getDate();

      // calculate the new current consumption based on the rate, number of days
      let currentConsumption = lastConsumption + numberOfDays*lastConsumptionRate;

      data.push(currentConsumption);
      lastConsumption = currentConsumption;
      lastDate = key;

      // the newly deployed consumption for the current date updates the current rate (up or down)
      // and will apply the next period
      let newConsumption = value; 
      lastConsumptionRate = lastConsumptionRate + newConsumption;
      console.log("New last consumption is %O", lastConsumption);
      console.log("New last consumption rate is %O", lastConsumptionRate);
    });
    
    console.log("Consumptions: %O", consumptions);
    console.log("Dates: %O", dates);
    console.log("Data: %O", data);

    const config = new MatDialogConfig();
    config.data = [
      'Usage timeline',
      'CLOSE',
      '',
      data,
      dates
    ];
    config.width = '440px';
    let dialogRef = this.dialog.open(ShowTimelineDialog, config);
    dialogRef.afterClosed().subscribe(shareWith => {
      
    });
  }

  ngOnDestroy() {
    this.breadcrumbService.breadcrumb = [];
  }

  openShareConfigurationDialog(configurationDetail: ConfigurationComponent) {
    let dialogRef = this.dialog.open(ShareDialog);
    dialogRef.afterClosed().subscribe(shareWith => {
      if (shareWith)
        configurationDetail.share(shareWith);
    });
  }

  openEditConfigurationDialog(configurationDetail: ConfigurationComponent) {
    let dialogRef:MatDialogRef<EditConfigurationDialog>  = this.dialog.open(EditConfigurationDialog);
    dialogRef.componentInstance.setConfiguration(configurationDetail.configurationPresenter);
    dialogRef.afterClosed().subscribe(
      configurationForm => {
        if (configurationForm)
          configurationDetail.updateConfiguration(configurationForm);
      }
    );
  }
  
  openConfirmDeleteDialog(configurationDetail: ConfigurationComponent) {
    const config = new MatDialogConfig();
    config.data = [
      'You are about to permanently delete the configuration \'' + configurationDetail.configurationPresenter.name +'\'',
      'DELETE',
      'Please confirm',
      'That will also destroy all associated deployments'
    ];
    let dialogRef = this.dialog.open(SuggestActionDialog, config);
    dialogRef.afterClosed().subscribe(actionTaken => {
      if (actionTaken == 'DELETE')
      configurationDetail.remove();
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

    if (seconds > 59) {
      if (minutes > 59) {
          hours = Math.floor(minutes / 60);
          if (hours>23) {
            days = Math.floor(hours / 24);
            daysChar = days.toFixed(0);
            hours = hours - (days * 24);
          }
          hoursChar = (hours >= 10) ? hours.toFixed(0) : "0" + hours.toFixed(0);
      }
      minutes = minutes - (days * 24 * 60) - (hours * 60);
      minutesChar = (minutes >= 10) ? minutes.toFixed(0) : "0" + minutes.toFixed(0);
    }

    seconds = Math.floor(seconds % 60);
    secondsChar = (seconds >= 10) ? seconds.toFixed(0) : "0" + seconds.toFixed(0);

    if (days > 0) {
      return daysChar + " days " + hoursChar + "h " + minutesChar + "min " + secondsChar +"sec";
    } else if (hours > 0) {
      return hoursChar + "h " + minutesChar + "min " + secondsChar +"sec";
    } else if (minutes > 0) {
      return minutesChar + "min " + secondsChar +"sec";
    } else {
      return secondsChar +"sec";
    }
  }

}
