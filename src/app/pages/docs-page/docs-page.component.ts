import { Component } from '@angular/core';

@Component({
  selector: 'docs-page',
  styles: [require('./docs-page.style.css')],
  template: require('./docs-page.template.html')
})
export class DocsPage {

	welcomePage = "assets/img/welcome_page.png"; 

 	homeMenu = 'assets/img/home_menu.png';
	
  	loginUserPassword = 'assets/img/login_normal.png';
  	loginSSOStepOne = 'assets/img/login_sso_step_one.png';
  	loginSSOStepTwo = 'assets/img/login_sso_step_two.png';
  	
  	homeProfile = 'assets/img/profile_menu.png';
  	
  	profileAddCppStepOne = 'assets/img/profile_add_cpp_step_one.png';
  	profileAddCppStepTwo  = 'assets/img/profile_add_cpp_step_two.png';
  	profileAddedCpp = 'assets/img/profile_after_adding_cpp.png';
  	

 	profileAddTeam = 'assets/img/profile_add_team.png';
  	profileAfterAddingTeam = 'assets/img/profile_after_adding_team.png';
  	profileAddTeamMembers = 'assets/img/profile_add_team_members.png';
  	profileAfterAddingTeamMember = 'assets/img/profile_after_adding_team_member.png';
  	
  	profileSharingCpp = 'assets/img/profile_sharing_cpp.png';
  	
  	homeRepository = 'assets/img/home_repository.png';
  	
  	repositoryAddedApplication = 'assets/img/repository_added_application.png';
  	repositoryAddingApplication= 'assets/img/repository_adding_application.png';
  	
  	repositoryToShareApplication = 'assets/img/repository_application_share.png';
  	repositorySharingApplication = 'assets/img/repository_sharing_application.png';
  
  
	  constructor() {
	
	  }
	
	  ngOnInit() {
	
	  }

}
