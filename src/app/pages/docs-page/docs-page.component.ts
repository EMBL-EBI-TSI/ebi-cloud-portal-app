import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-docs-page',
  templateUrl: './docs-page.component.html',
  styleUrls: ['./docs-page.component.css']
})
export class DocsPageComponent implements OnInit {

	welcomePage = "assets/img/welcome_page.png"; 
	menuSymbol = "assets/img/menu.png";
	sidebarSymbol = "assets/img/sidebar.png";
	shareSymbol = "assets/img/share.png";

 	homeMenu = 'assets/img/home_menu.png';
	
	loginUserPassword = 'assets/img/login_normal.png';
	loginSSOStepOne = 'assets/img/login_sso_step_one.png';
	loginSSOStepTwo = 'assets/img/login_sso_step_two.png';
  	
	homeProfile = 'assets/img/profile_menu.png';
	
	profileAddCppStepOne = 'assets/img/profile_add_cpp_step_one.png';
	profileAddCppStepTwo  = 'assets/img/profile_add_cpp_step_two.png';
	profileAddedCpp = 'assets/img/profile_after_adding_cpp.png';
	

 	profileAddTeam = 'assets/img/profile_add_team.png';
	profileTeamDetails = 'assets/img/profile_team_details.png';
	profileAfterAddingTeam = 'assets/img/profile_after_adding_team.png';
	profileAddTeamMembers = 'assets/img/profile_add_team_members.png';
	profileAfterAddingTeamMember = 'assets/img/profile_after_adding_team_member.png';
	
	profileSharingCpp = 'assets/img/profile_sharing_cpp.png';
	
	homeRepository = 'assets/img/home_repository.png';
	
	repositoryAddedApplication = 'assets/img/repository_added_application.png';
	repositoryAddingApplication= 'assets/img/repository_adding_application.png';
	
	repositoryToShareApplication = 'assets/img/repository_application_share.png';
	repositorySharingApplication = 'assets/img/repository_sharing_application.png';
	
	profileBeforeAddingDP = 'assets/img/profile_adding_deployment_parameters.png';
	profileAfterAddingDP = 'assets/img/profile_after_adding_deployment_parameters.png';
	
	profileBeforeAddingConfig = 'assets/img/profile_adding_configuration.png';
	profileAfterAddingConfig = 'assets/img/profile_after_adding_configuration.png';

	applicationDetails = 'assets/img/application_details.png';

	deployChooseApplication = 'assets/img/deploy_select_application.png';
	deployChooseCloudProvider = 'assets/img/deploy_select_cloud_provider.png';
	deployChooseConfiguration = 'assets/img/deploy_choose_configuration.png';
	deployApplication = 'assets/img/deploy_application.png';
  
	  constructor(public breadcrumbService: BreadcrumbService) {
	    
	  }

	  ngOnInit() {
	    this.breadcrumbService.breadcrumb.push( {label:'Documentation', route:'docs'} );
	  }
	
	  ngOnDestroy() {
	    this.breadcrumbService.breadcrumb = [];
	  }

}
