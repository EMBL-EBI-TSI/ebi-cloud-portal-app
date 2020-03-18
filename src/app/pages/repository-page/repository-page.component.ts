import { Component, OnInit, DoCheck, ViewChild, ElementRef } from '@angular/core';
import { CloudProviderParametersService, TokenService, CredentialService } from 'ng2-cloud-portal-service-lib';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { RepositoryComponent } from 'ng2-cloud-portal-presentation-lib';
import { AddRepoDialog } from '../../dialogs/add-repo-dialog/add-repo-dialog.component';
import { SuggestActionDialog } from '../../dialogs/suggest-action-dialog/suggest-action-dialog.component';


@Component({
  selector: 'repository-page',
  templateUrl: './repository-page.component.html',
  styleUrls: ['./repository-page.component.css']
})
export class RepositoryPageComponent implements OnInit, DoCheck {

  @ViewChild('repo') repo: ElementRef;

  cloudProviderFilters: string[] = ["AWS", "GCP", "OSTACK", "AZURE"];

  constructor(public cloudProviderParametersService: CloudProviderParametersService,
    public credentialService: CredentialService,
    public tokenService: TokenService,
    public breadcrumbService: BreadcrumbService,
    public dialog: MatDialog) {
    this.updateFilters();
  }

  ngAfterViewInit() {
    (<RepositoryComponent>this.repo)._applicationService.getAll(
      this.credentialService.getUsername(),
      this.tokenService.getToken())
      .subscribe(
      applications => {
        console.log('[RepositoryPageComponent] Applications data is %O', applications);
        if (applications.length==0) {
          (<RepositoryComponent>this.repo)._applicationService.getAllShared(
            this.credentialService.getUsername(),
            this.tokenService.getToken())
            .subscribe(
            sharedApplications => {
              console.log('[RepositoryPageComponent] Shared applications data is %O', sharedApplications);
              if (sharedApplications.length==0) {
                // this.openSuggestAddApplicationDialog(this.repo);
              }
            },
            error => {
              
            },
            () => {
                console.log('[RepositoryPageComponent] Shared applications data retrieval complete');
            }
          );
        }
      },
      error => {
        
      },
      () => {
          console.log('[RepositoryPageComponent] Applications data retrieval complete');
      }
    );
  }

  updateFilters() {
    if (this.cloudProviderParametersService.currentlySelectedCloudProviderParameters) {
      this.cloudProviderFilters = [this.cloudProviderParametersService.currentlySelectedCloudProviderParameters.cloudProvider];
    }
  }

  ngOnInit() {
    this.breadcrumbService.breadcrumb.push(
      { label: 'Repository', route: 'repository' }
    );
  }

  ngOnDestroy() {
    this.breadcrumbService.breadcrumb = [];
  }

  ngDoCheck() {
    if (!(this.cloudProviderFilters.length == 1 &&
      this.cloudProviderFilters.includes(this.cloudProviderParametersService.currentlySelectedCloudProviderParameters.cloudProvider))) {
      this.updateFilters();
    }
  }

  openAddApplicationDialog(repo: RepositoryComponent) {
    let dialogRef = this.dialog.open(AddRepoDialog);
    dialogRef.afterClosed().subscribe(repoUri => {
      if (repoUri)
        repo.addApplication({ repoUri: repoUri });
      
    });
  }

  openSuggestAddApplicationDialog(repo: RepositoryComponent) {
    const config = new MatDialogConfig();

    config.data = [
      'It seems you have no applications registered. Do you want to add your own?',
      'GO',
    ];
    let dialogRef = this.dialog.open(SuggestActionDialog, config);
    dialogRef.afterClosed().subscribe(actionTaken => {
      if (actionTaken=='GO')
        this.openAddApplicationDialog(repo);
    });
  }

}
