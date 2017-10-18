import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MdDialog, MdDialogConfig, MdTabGroup } from '@angular/material';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';
import { AddCloudProviderDialog } from '../../dialogs/add-cloud-provider-dialog/add-cloud-provider-dialog.component';
import { AddConfigurationDialog } from '../../dialogs/add-configuration-dialog/add-configuration-dialog.component';
import { AddDeploymentParametersDialog } from '../../dialogs/add-deployment-parameters-dialog/add-deployment-parameters-dialog.component';
import { AddTeamDialog } from '../../dialogs/add-team-dialog/add-team-dialog.component';
import { ProfileComponent } from 'ng2-cloud-portal-presentation-lib';
import { CloudProviderParametersService, TokenService, CredentialService } from 'ng2-cloud-portal-service-lib';
import { SuggestActionDialog } from '../../dialogs/suggest-action-dialog/suggest-action-dialog.component';


@Component({
  selector: 'profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  @ViewChild('profileComponent') profileComponent: ProfileComponent;
  @ViewChild('configurationsTabGroup') configurationsTabGroup: MdTabGroup;


  constructor(
    public cloudProviderParametersService: CloudProviderParametersService,
    public credentialService: CredentialService,
    public tokenService: TokenService,
    public breadcrumbService: BreadcrumbService,
    public dialog: MdDialog) { }

  ngOnInit() {
    this.breadcrumbService.breadcrumb.push(
      {label: 'Profile', route: 'profile'}
    );
  }

  ngOnDestroy() {
    this.breadcrumbService.breadcrumb = [];
  }

  ngAfterViewInit() {
    // this.checkForConfigs();
  }

  private checkForParams() {
    switch (this.configurationsTabGroup.selectedIndex) {
      case 0:
        this.checkForConfigs();
        break;
      case 1:
        this.checkForCPP();
        break;
      case 2: 
        this.checkForDP();
        break;
    }
  }

  private checkForConfigs() {
    (<ProfileComponent>this.profileComponent)._configurationService.getAll(
      this.credentialService.getUsername(),
      this.tokenService.getToken())
      .subscribe(
      configs => {
        console.log('[ProfilePageComponent] Configs data is %O', configs);
        if (configs.length==0) {
          (<ProfileComponent>this.profileComponent)._configurationService.getAllSharedConfigurations(
            this.credentialService.getUsername(),
            this.tokenService.getToken())
            .subscribe(
            sharedConfigs => {
              console.log('[ProfilePageComponent] shared Configs data is %O', sharedConfigs);
              if (sharedConfigs.length==0) {
                this.openSuggestAddCPPDialog(this.profileComponent, this.configurationsTabGroup,
                'It seems you still need some Configuration in order to deploy applicatios. Do you want to add one?', 0);
              }
            },
            error => {
              
            },
            () => {
                console.log('[ProfilePageComponent] Shared Configurations data retrieval complete');
            }
          );
        }         
      },
      error => {
        
      },
      () => {
          console.log('[RepositoryPageComponent] Configurations data retrieval complete');
      }
    );
  }

  private checkForCPP() {
    (<ProfileComponent>this.profileComponent)._cloudProviderParametersService.getAll(
      this.credentialService.getUsername(),
      this.tokenService.getToken())
      .subscribe(
      cpps => {
        console.log('[ProfilePageComponent] CPPs data is %O', cpps);
        if (cpps.length==0) {
          (<ProfileComponent>this.profileComponent)._cloudProviderParametersService.getAllShared(
            this.credentialService.getUsername(),
            this.tokenService.getToken())
            .subscribe(
            sharedCpps => {
              console.log('[ProfilePageComponent] Shared CPPs data is %O', sharedCpps);
              if (sharedCpps.length==0) {
                this.configurationsTabGroup.selectedIndex=0;
                this.openSuggestAddCPPDialog(this.profileComponent, this.configurationsTabGroup,
                'It seems you still need some Cloud Provider to deploy to. Do you want to set one?', 1);
              } else {
                
              }
            },
            error => {
              
            },
            () => {
                console.log('[ProfilePageComponent] Shared CPPs data retrieval complete');
            }
          );
        } else {
          
        }
        
      },
      error => {
        
      },
      () => {
          console.log('[ProfilePageComponent] DPs data retrieval complete');
      }
    );
  }

  private checkForDP() {
    (<ProfileComponent>this.profileComponent)._configurationService.getAllDeploymentParameters(
      this.credentialService.getUsername(),
      this.tokenService.getToken())
      .subscribe(
      dps => {
        console.log('[ProfilePageComponent] DPs data is %O', dps);
        if (dps.length==0) {
          (<ProfileComponent>this.profileComponent)._configurationService.getAllSharedConfigurationDeploymentParameters(
            this.credentialService.getUsername(),
            this.tokenService.getToken())
            .subscribe(
            sharedDps => {
              console.log('[ProfilePageComponent] Shared DPs data is %O', sharedDps);
              if (sharedDps.length==0) {
                this.openSuggestAddCPPDialog(this.profileComponent, this.configurationsTabGroup,
                'It seems you still need some Deployment Parameters to include in an application Configuration. Do you want to add some?', 2);
              } else {
                
              }
            },
            error => {
              
            },
            () => {
                console.log('[ProfilePageComponent] Shared DPs data retrieval complete');
            }
          );
        } else {
          
        }
        
      },
      error => {
        
      },
      () => {
          console.log('[RepositoryPageComponent] Applications data retrieval complete');
      }
    );
  }

  openAddDialog() {
    console.log("Selected tab is %O", this.configurationsTabGroup.selectedIndex);

    let dialogRef;
    switch (this.configurationsTabGroup.selectedIndex) {
      case 0:
      dialogRef = this.dialog.open(AddConfigurationDialog);
        dialogRef.afterClosed().subscribe(
          configurationForm => {
            if (configurationForm)
              this.profileComponent.addConfiguration(configurationForm);
          }
        );
        break;
      case 1:
        dialogRef = this.dialog.open(AddCloudProviderDialog);
        dialogRef.afterClosed().subscribe(
          cloudProviderParametersForm => {
            if (cloudProviderParametersForm)
              this.profileComponent.addCloudProviderParameters(cloudProviderParametersForm);
          }
        );
        break;
      case 2: 
        dialogRef = this.dialog.open(AddDeploymentParametersDialog);
        dialogRef.afterClosed().subscribe(
          deploymentParametersForm => {
            if (deploymentParametersForm)
              this.profileComponent.addDeploymentParameters(deploymentParametersForm);
          }
        );
        break;
      case 3:
        dialogRef = this.dialog.open(AddTeamDialog);
        dialogRef.afterClosed().subscribe(
          teamForm => {
            if (teamForm)
              this.profileComponent.addTeam(teamForm);
          }
        );
        break;
    }
    
  }

  openSuggestAddCPPDialog(profileComponent: ProfileComponent, configurationsTabGroup, message: string, tab: number) {
    this.configurationsTabGroup.selectedIndex=tab;
    const config = new MdDialogConfig();

    config.data = [
      message,
      'GO'
    ];

    let dialogRef = this.dialog.open(SuggestActionDialog, config);
    dialogRef.afterClosed().subscribe(actionTaken => {
      if (actionTaken=='GO') {
        
        this.openAddDialog();
      }
    });
  }
}
