import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';
import { CloudProviderParametersComponent } from 'ng2-cloud-portal-presentation-lib';
import 'rxjs/add/operator/startWith';
import { TeamService, TokenService, ErrorService } from 'ng2-cloud-portal-service-lib';

@Component({
  selector: 'app-cloud-provider-parameters-page',
  templateUrl: './cloud-provider-parameters-page.component.html',
  styleUrls: ['./cloud-provider-parameters-page.component.css']
})
export class CloudProviderParametersPageComponent implements OnInit {

  constructor(public breadcrumbService: BreadcrumbService,
    public dialog: MdDialog, private _route: ActivatedRoute) {

  }

  ngOnInit() {
    let providerName = this._route.snapshot.params['id'];
    this.breadcrumbService.breadcrumb.push({ label: 'Profile', route: 'profile' });
    this.breadcrumbService.breadcrumb.push({ label: providerName, route: 'cloudprovider/' + providerName });
  }

  ngOnDestroy() {
    this.breadcrumbService.breadcrumb = [];
  }

  openShareCloudProviderDialog(cloudProviderDetail: CloudProviderParametersComponent) {
    let dialogRef = this.dialog.open(ShareCloudProviderDialog, {data: ['hola']});
    dialogRef.afterClosed().subscribe(shareWith => {
      if (shareWith)
        cloudProviderDetail.share(shareWith);
    });
  }
}

@Component({
  selector: 'share-cloud-provider-dialog',
  templateUrl: './share-cloud-provider-dialog.html',
})
export class ShareCloudProviderDialog {
  robby = 'assets/img/Robby_form0.5x.png';
  shareWithCtrl: FormControl;
  filteredTeams: any;
  teamNames: string[];

  constructor(public teamService: TeamService,
              public tokenService: TokenService,
              public errorService: ErrorService,
              private _router: Router,
              public dialogRef: MdDialogRef<ShareCloudProviderDialog>) { 
    this.shareWithCtrl = new FormControl();
    this.teamService.getAllMember(this.tokenService.getToken())
      .subscribe(
      teams => {
        console.log('[ShareDialog] member teams data is %O', teams);
        this.teamNames = teams.map(team => team.name);
        this.filteredTeams = this.shareWithCtrl.valueChanges
        .startWith(null)
        .map(team => this.filterTeams(team));
      },
      error => {
        console.log('[Profile] error %O', error);
        if (error[0]) {
          error = error[0];
        }
        this.errorService.setCurrentError(error);
        this._router.navigateByUrl('/error');
      },
      () => {
          console.log('[ShareDialog] Shared Cloud provider parameters data retrieval complete');
      }
    );
    
  }

  filterTeams(val: string) {
    return val ? this.teamNames.filter(s => new RegExp(`^${val}`, 'gi').test(s))
               : this.teamNames;
  }

}