import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'deployments-page',
  templateUrl: './deployments-page.component.html',
  styleUrls: ['./deployments-page.component.css']
})
export class DeploymentsPageComponent implements OnInit {

  statusFilters: string[] = [];
  hideDestroyed: boolean = false;

  constructor(public breadcrumbService: BreadcrumbService) {
    
  }

  ngOnInit() {
    this.breadcrumbService.breadcrumb.push( {label:'Deployments', route:'deployments'} );
  }

  ngOnDestroy() {
    this.breadcrumbService.breadcrumb = [];
  }

  switchDestroyed() {
    this.hideDestroyed = !this.hideDestroyed;
    this.updateFilters();
  }

  updateFilters() {
    this.statusFilters = [];
    if (this.hideDestroyed) {
      this.statusFilters.push('DESTROYED');
    } 
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
