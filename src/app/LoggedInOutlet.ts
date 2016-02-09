import {Directive, Attribute, ElementRef, DynamicComponentLoader} from 'angular2/core';
import {Router, RouterOutlet, ComponentInstruction} from 'angular2/router';
import {Login} from './login/login';

@Directive({
  selector: 'loggedin-router-outlet'
})
export class LoggedInRouterOutlet extends RouterOutlet {
  publicRoutes: any;
  private parentRouter: Router;

  constructor(_elementRef: ElementRef, _loader: DynamicComponentLoader,
              _parentRouter: Router, @Attribute('name') nameAttr: string) {
    super(_elementRef, _loader, _parentRouter, nameAttr);

    this.parentRouter = _parentRouter;
    this.publicRoutes = {
      'login': true,
      'logout': false,
      'deployments': false,
      'repository': false,
      'home': false,
      'about': true
    };
  }

  activate(instruction: ComponentInstruction) {
    var url = instruction.urlPath;
    console.log("Url is " + url);
    console.log("Username is " + localStorage.getItem('username'));
    if (url) {
      if (!this.publicRoutes[url] && !localStorage.getItem('username')) {
        // todo: redirect to Login, may be there a better way?
        console.log("Trying to redirect to login from " + url);
        instruction.urlPath = 'login';
        instruction.componentType = Login;
      }
    }
    return super.activate(instruction);
  }
}