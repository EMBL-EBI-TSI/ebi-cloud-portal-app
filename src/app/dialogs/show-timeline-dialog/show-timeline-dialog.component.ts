import { Component, OnInit, Inject, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';

import * as c3 from 'c3';

@Component({
  selector: 'show-timeline-dialog',
  templateUrl: './show-timeline-dialog.html',
})
export class ShowTimelineDialog {
  chartTitle: string = 'Timeline';
  chartSubtitle: string = 'Time period';
  actionButtonMessage: string = 'CLOSE';
  actionTaken: string = 'close';
  data = [];
  dates = []
  chart;

  constructor(private _router: Router,
              @Optional() @Inject(MAT_DIALOG_DATA) private dialogData: any,
              public dialogRef: MatDialogRef<ShowTimelineDialog>) { 
    
  }

  ngOnInit(): void {
    this.chartTitle = this.dialogData[0];
    this.actionButtonMessage = this.dialogData[1];
    this.chartSubtitle = this.dialogData[2];
    this.data = this.dialogData[3];
    this.dates = this.dialogData[4];

    this.chart = c3.generate({
      bindto: '#chart',
        data: {
          x: 'x',
          columns: [
            ["x"].concat(this.dates),
            ["Consumption"].concat(this.data)
          ],
          types: {
            Consumption: 'area'
          }
        },
        axis: {
            x: {
                type: 'timeseries',
                tick: {
                    format: '%Y-%m-%d'
                }
            }
        }
    });
  }
}